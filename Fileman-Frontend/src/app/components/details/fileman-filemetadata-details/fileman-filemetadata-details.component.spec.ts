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

import { FilemetadataDetailsComponent } from './fileman-filemetadata-details.component';
import { FilemanOverviewComponent } from '../../fileman-overview/fileman-overview.component';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';

describe('FilemanDetailsComponent', () => {
  let component: FilemetadataDetailsComponent;
  let fixture: ComponentFixture<FilemetadataDetailsComponent>;
  let metadataService: FilemanMetadataService;
  let fileService: FilemanFileService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ FilemetadataDetailsComponent ],
      imports: [ RouterTestingModule.withRoutes(
        [{path: 'fileman/overview', component: FilemanOverviewComponent}]
      ), HttpClientModule ]
    });

    fixture = TestBed.createComponent(FilemetadataDetailsComponent);
    component = fixture.componentInstance;

    metadataService = fixture.debugElement.injector.get(FilemanMetadataService);
    fileService = fixture.debugElement.injector.get(FilemanFileService);

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new file', () => {

    // fake server call in metadataService should return empty array
    spyOn<any>(metadataService, 'getOverviewDataFromServer').and.returnValue(
      new Observable(stream => {
        stream.next([]);
        stream.complete();
    }));

    const mockFile = new File([], 'mock_file.txt', { type: 'text/plain' });
    const mockEvent: Event = <Event><any> {
      srcElement: {
        files: [mockFile]
      }
    };

    component.onFileContentSourceChange(mockEvent);

    // correct file name is displayed after file selection
    expect(component.nameC.value).toEqual('mock_file.txt');

    // before save: 0 files
    metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
      expect(metaData.length).toEqual(0);
    });

    component.newFileMode = true;

    const createSpy = spyOn(fileService, 'create').and.returnValue(new Observable(() => {
      // after save: 1 file (mock file from above)
      metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
        expect(metaData.length).toEqual(1);
        expect(metaData[0].getName()).toEqual('mock_file.txt');
      });
    }));

    component.save();

    expect(createSpy).toHaveBeenCalled();
  });

  it('should modify metadata', () => {

    const existingFile: FileMetaData = new FileMetaData(
      {name: 'existing.txt',
      description: 'description_before',
      immediatelyActive: true}
    );

    // fake server call in metadataService should return above test file
    spyOn<any>(metadataService, 'getOverviewDataFromServer').and.returnValue(
      new Observable(stream => {
        stream.next([existingFile]);
        stream.complete();
    }));

    // before modification: old metadata
    metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
      expect(metaData.length).toEqual(1);
      expect(metaData[0].getName()).toEqual('existing.txt');
      expect(metaData[0].getDescription()).toEqual('description_before');
      expect(metaData[0].getImmediatelyActive()).toEqual(true);
    });

    component.newFileMode = false;
    component.nameC.setValue('existing.txt');
    component.descriptionC.setValue('description_after');
    component.immediatelyActiveC.setValue(false);

    const updateSpy = spyOn(fileService, 'update').and.returnValue(new Observable(() => {
      // after modification: new metadata
      metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
        expect(metaData.length).toEqual(1);
        expect(metaData[0].getName()).toEqual('existing.txt');
        expect(metaData[0].getDescription()).toEqual('description_after');
        expect(metaData[0].getImmediatelyActive()).toEqual(false);
      });
    }));

    component.save();

    expect(updateSpy).toHaveBeenCalled();
  });

  it('should modify content', () => {

    const existingFile: FileMetaData = new FileMetaData(
      {name: 'old_file.txt', size: 0}
    );

    // fake server call in metadataService should return above test file
    spyOn<any>(metadataService, 'getOverviewDataFromServer').and.returnValue(
      new Observable(stream => {
        stream.next([existingFile]);
        stream.complete();
    }));

    // before modification: old file
    metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
      expect(metaData.length).toEqual(1);
      expect(metaData[0].getName()).toEqual('old_file.txt');
      expect(metaData[0].getSize()).toEqual(0);
    });

    component.newFileMode = false;
    component.nameC.setValue('old_file.txt');

    const mockContent: string = 'someContent';
    const mockFile = new File([mockContent], 'new_file.txt', { type: 'text/plain' });
    const mockEvent: Event = <Event><any> {
      srcElement: {
        files: [mockFile]
      }
    };

    component.onFileContentSourceChange(mockEvent);

    // new file name visible as content source
    expect(component.selectedFileContentSource.name).toEqual('new_file.txt');

    // name field should not change after new file selection
    expect(component.nameC.value).toEqual('old_file.txt');

    const updateSpy = spyOn(fileService, 'update').and.returnValue(new Observable(() => {
      // after modification: file with old name and new content (indicated by file size)
      metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
        expect(metaData.length).toEqual(1);
        expect(metaData[0].getName()).toEqual('old_file.txt');
        expect(metaData[0].getSize()).toEqual(mockContent.length);
      });
    }));

    component.save();

    expect(updateSpy).toHaveBeenCalled();
  });
});
