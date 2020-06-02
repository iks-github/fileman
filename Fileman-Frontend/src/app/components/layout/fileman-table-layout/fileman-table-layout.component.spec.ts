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

import { FilemanTableLayout } from './fileman-table-layout.component';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';

describe('FilemanTableLayout', () => {
  let component: FilemanTableLayout;
  let fixture: ComponentFixture<FilemanTableLayout>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ FilemanTableLayout ],
      imports: [ RouterTestingModule, HttpClientModule ]
    });

    fixture = TestBed.createComponent(FilemanTableLayout);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all options as non-read-only', () => {
    component.readOnly = false;
    component.favouriteSettings = new Map<string, FavouriteSetting>();

    const testFile: FileMetaData = new FileMetaData({name: 'test.txt'});
    component.viewedFiles = [testFile];

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#option-download'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-edit'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-delete'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-show-history'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-change-favourite'))).toBeTruthy();
  });

  it('should have all options but edit/delete as read-only', () => {
    component.readOnly = true;
    component.favouriteSettings = new Map<string, FavouriteSetting>();

    const testFile: FileMetaData = new FileMetaData({name: 'test.txt'});
    component.viewedFiles = [testFile];

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#option-download'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-edit'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#option-delete'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#option-show-history'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#option-change-favourite'))).toBeTruthy();
  });
});
