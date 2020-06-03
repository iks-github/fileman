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
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilemanTilesLayout } from './fileman-tiles-layout.component';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';
import { Icon } from 'src/app/common/fileman-constants';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';

describe('FilemanTilesLayout', () => {
  let component: FilemanTilesLayout;
  let fixture: ComponentFixture<FilemanTilesLayout>;

  beforeEach(() => {

    let previewService: FilemanPreviewService =
      jasmine.createSpyObj<FilemanPreviewService>(
      'FilemanPreviewService', ['fetchFileFromServer', 'hasPreview']);

    TestBed.configureTestingModule({
      declarations: [ FilemanTilesLayout ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [{provide: FilemanPreviewService, useValue: previewService}]
    });

    fixture = TestBed.createComponent(FilemanTilesLayout);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all icons as non-read-only', () => {
    component.readOnly = false;
    component.favouriteSettings = new Map<string, FavouriteSetting>();
    component.allFilesMap = new Map<string, FileMetaData>();

    const testFile: FileMetaData = new FileMetaData({name: 'test.txt'});
    component.allFilesMap.set(testFile.getName(), testFile);
    component.viewedFiles = [testFile];

    fixture.detectChanges();

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-icon'));
    const iconStrings: Array<string> = [];

    for (let debugElement of debugElements) {
      iconStrings.push(debugElement.nativeElement.innerText);
    }

    expect(iconStrings.length).toEqual(5);
    expect(iconStrings).toContain(Icon.Download);
    expect(iconStrings).toContain(Icon.Edit);
    expect(iconStrings).toContain(Icon.Delete);
    expect(iconStrings).toContain(Icon.ShowHistory);
    expect(iconStrings).toContain(Icon.FavouriteFilterInactive);
  });

  it('should have all icons but edit/delete as read-only', () => {
    component.readOnly = true;
    component.favouriteSettings = new Map<string, FavouriteSetting>();
    component.allFilesMap = new Map<string, FileMetaData>();

    const testFile: FileMetaData = new FileMetaData({name: 'test.txt'});
    component.allFilesMap.set(testFile.getName(), testFile);
    component.viewedFiles = [testFile];

    fixture.detectChanges();

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-icon'));
    const iconStrings: Array<string> = [];

    for (let debugElement of debugElements) {
      iconStrings.push(debugElement.nativeElement.innerText);
    }

    expect(iconStrings.length).toEqual(3);
    expect(iconStrings).toContain(Icon.Download);
    expect(iconStrings).not.toContain(Icon.Edit);
    expect(iconStrings).not.toContain(Icon.Delete);
    expect(iconStrings).toContain(Icon.ShowHistory);
    expect(iconStrings).toContain(Icon.FavouriteFilterInactive);
  });
});
