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

import { FilemanToolbarComponent } from './fileman-toolbar.component';
import { DebugElement } from '@angular/core';
import { Icon } from 'src/app/common/fileman-constants';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('FilemanToolbarComponent', () => {
  let component: FilemanToolbarComponent;
  let fixture: ComponentFixture<FilemanToolbarComponent>;
  let mockRouter: any;

  beforeEach(() => {

    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      declarations: [ FilemanToolbarComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [{ provide: Router, useValue: mockRouter}],
    });

    fixture = TestBed.createComponent(FilemanToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow new-file dialog when not read-only', () => {
    component.readOnly = false;
    component.onNewClick();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should not allow new-file dialog when read-only', () => {
    component.readOnly = true;
    component.onNewClick();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should have all icons as admin', () => {
    component.isAdmin = true;
    fixture.detectChanges();

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-icon'));
    const iconStrings: Array<string> = [];

    for (let debugElement of debugElements) {
      iconStrings.push(debugElement.nativeElement.innerText);
    }

    expect(iconStrings.length).toEqual(8);
    expect(iconStrings).toContain(Icon.List);
    expect(iconStrings).toContain(Icon.Table);
    expect(iconStrings).toContain(Icon.Tiles);
    expect(iconStrings).toContain(Icon.New);
    expect(iconStrings).toContain(Icon.Reload);
    expect(iconStrings).toContain(Icon.FavouriteFilterInactive);
    expect(iconStrings).toContain(Icon.Database);
    expect(iconStrings).toContain(Icon.Logout);
  });

  it('should have all icons but database as non-admin', () => {
    component.isAdmin = false;
    fixture.detectChanges();

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-icon'));
    const iconStrings: Array<string> = [];

    for (let debugElement of debugElements) {
      iconStrings.push(debugElement.nativeElement.innerText);
    }

    expect(iconStrings.length).toEqual(7);
    expect(iconStrings).toContain(Icon.List);
    expect(iconStrings).toContain(Icon.Table);
    expect(iconStrings).toContain(Icon.Tiles);
    expect(iconStrings).toContain(Icon.New);
    expect(iconStrings).toContain(Icon.Reload);
    expect(iconStrings).toContain(Icon.FavouriteFilterInactive);
    expect(iconStrings).toContain(Icon.Logout);
  });
});
