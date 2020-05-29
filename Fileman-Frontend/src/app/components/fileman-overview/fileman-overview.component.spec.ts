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
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilemanOverviewComponent } from './fileman-overview.component';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';

describe('FilemanOverviewComponent', () => {
  let component: FilemanOverviewComponent;
  let fixture: ComponentFixture<FilemanOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanOverviewComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete file',
      inject([FilemanMetadataService, FilemanFileService],
      (metadataService: FilemanMetadataService, fileService: FilemanFileService) => {

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
    spyOn(fileService, 'delete').and.returnValue(
      new Observable(() => {
        // after deletion: only 1 file left (the one that was not deleted)
        expect(component.viewedFiles.length).toEqual(1);
        expect(component.viewedFiles[0].getName()).toEqual('to_persist.txt');
    }));

    component.delete(toBeDeleted);
  }));
});
