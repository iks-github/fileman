/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilemanOverviewComponent } from './fileman-overview.component';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FilemanFavouriteSettingsService } from 'src/app/services/fileman-favourite-settings-service.service';

describe('FilemanOverviewComponent', () => {
  let component: FilemanOverviewComponent;
  let fixture: ComponentFixture<FilemanOverviewComponent>;
  let metadataService: FilemanMetadataService;
  let fileService: FilemanFileService;
  let favouriteSettingsService: FilemanFavouriteSettingsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ FilemanOverviewComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    });

    fixture = TestBed.createComponent(FilemanOverviewComponent);
    component = fixture.componentInstance;

    metadataService = fixture.debugElement.injector.get(FilemanMetadataService);
    fileService = fixture.debugElement.injector.get(FilemanFileService);
    favouriteSettingsService = fixture.debugElement.injector.get(FilemanFavouriteSettingsService);

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete file', () => {

    const toBeDeleted: FileMetaData = new FileMetaData({name: 'to_be_deleted.txt'});
    const toPersist: FileMetaData = new FileMetaData({name: 'to_persist.txt'});

    // fake server call in metadataService should return 2 test files
    spyOn<any>(metadataService, 'getOverviewDataFromServer').and.returnValue(
      new Observable(stream => {
        stream.next([toBeDeleted, toPersist]);
        stream.complete();
    }));

    component.onReloadClick();

    // before deletion: 2 files
    expect(component.viewedFiles.length).toEqual(2);
    expect(component.viewedFiles[0].getName()).toEqual('to_be_deleted.txt');
    expect(component.viewedFiles[1].getName()).toEqual('to_persist.txt');

    spyOn(window, 'confirm').and.returnValue(true);

    const deleteSpy = spyOn(fileService, 'delete').and.returnValue(
      new Observable(() => {
        // after deletion: only 1 file left (the one that was not deleted)
        expect(component.viewedFiles.length).toEqual(1);
        expect(component.viewedFiles[0].getName()).toEqual('to_persist.txt');
    }));

    component.delete(toBeDeleted);

    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should search for file', () => {
    const myFile1: FileMetaData = new FileMetaData({name: 'my_file_1.txt'});
    const myFile2: FileMetaData = new FileMetaData({name: 'my_file_2.txt'});
    const somethingElse: FileMetaData = new FileMetaData({name: 'something_else.txt'});

    // fake server call in metadataService should return above test files
    spyOn<any>(metadataService, 'getOverviewDataFromServer').and.returnValue(
      new Observable(stream => {
        stream.next([myFile1, myFile2, somethingElse]);
        stream.complete();
    }));

    component.onReloadClick();

    expect(component.viewedFiles.length).toEqual(3);
    expect(component.viewedFiles[0].getName()).toEqual('my_file_1.txt');
    expect(component.viewedFiles[1].getName()).toEqual('my_file_2.txt');
    expect(component.viewedFiles[2].getName()).toEqual('something_else.txt');

    component.searchFor('file');

    expect(component.viewedFiles.length).toEqual(2);
    expect(component.viewedFiles[0].getName()).toEqual('my_file_1.txt');
    expect(component.viewedFiles[1].getName()).toEqual('my_file_2.txt');

    component.searchFor('file_1');

    expect(component.viewedFiles.length).toEqual(1);
    expect(component.viewedFiles[0].getName()).toEqual('my_file_1.txt');

    component.searchFor('not_there');

    expect(component.viewedFiles.length).toEqual(0);

    spyOn(favouriteSettingsService, 'createFavouriteSetting').and.returnValue(
      new Observable(() => {
        // dummy
    }));

    component.markFavourite(myFile2);
    component.markFavourite(somethingElse);
    component.currentSearchString = '';
    component.onFavouriteFilterClick(true);

    // all marked favourites
    expect(component.viewedFiles[0].getName()).toEqual('my_file_2.txt');
    expect(component.viewedFiles[1].getName()).toEqual('something_else.txt');

    component.searchFor('file');

    // marked favourites with matching filename
    expect(component.viewedFiles[0].getName()).toEqual('my_file_2.txt');
  });
});
