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

import { FilemanFileOverviewComponent } from './fileman-user-overview.component';

describe('FilemanFileOverviewComponent', () => {
  let component: FilemanFileOverviewComponent;
  let fixture: ComponentFixture<FilemanFileOverviewComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ FilemanFileOverviewComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    });

    fixture = TestBed.createComponent(FilemanFileOverviewComponent);
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
