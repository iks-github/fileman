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

import { FilemanOverviewComponent } from './fileman-overview.component';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FilemanFavouriteSettingsService } from 'src/app/services/fileman-favourite-settings-service.service';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';

describe('FilemanOverviewComponent', () => {
  let component: FilemanOverviewComponent;
  let fixture: ComponentFixture<FilemanOverviewComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ FilemanOverviewComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    });

    fixture = TestBed.createComponent(FilemanOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
