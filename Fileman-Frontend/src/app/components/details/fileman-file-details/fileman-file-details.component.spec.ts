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

import { FilemanDetailsComponent } from './fileman-file-details.component';
import { FilemanOverviewComponent } from '../../fileman-overview/fileman-overview.component';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';

describe('FilemanDetailsComponent', () => {
  let component: FilemanDetailsComponent;
  let fixture: ComponentFixture<FilemanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanDetailsComponent ],
      imports: [ RouterTestingModule.withRoutes(
        [{path: 'fileman/overview', component: FilemanOverviewComponent}]
      ), HttpClientModule ],
      providers: [ FilemanMetadataService, FilemanFileService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new file',
      inject([FilemanMetadataService, FilemanFileService],
      (metadataService: FilemanMetadataService, fileService: FilemanFileService) => {

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

    spyOn(fileService, 'create');
    component.save();

    // after save: 1 file (mock file from above)
    metadataService.getOverviewData().subscribe((metaData: FileMetaData[]) => {
      expect(metaData.length).toEqual(1);
      expect(metaData[0].getName()).toEqual('mock_file.txt');
    });
  }));
});
