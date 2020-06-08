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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing/';
import { FormatDateDirective } from './directives/format-date.directive';
import { OutsideClickListenerDirective } from './directives/outside-click-listener.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { AppComponent } from './app.component';
import { MydatePipe } from './directives/mydate.pipe';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthGuard } from './services/guard/auth-guard.service';
import { AdminAuthGuard } from './services/guard/admin-auth-guard.service';

import { FilemanLogoComponent } from './components/fileman-logo.component';
import { FilemanLoginComponent } from './components/fileman-login/fileman-login.component';
import { FilemanOverviewComponent } from './components/fileman-overview/fileman-overview.component';
import { FilemanToolbarComponent } from './components/fileman-toolbar/fileman-toolbar.component';
import { FilemanSortIconComponent } from './components/helper/fileman-sort-icon/fileman-sort-icon.component';
import { FilemanFavouriteSettingsService } from './services/fileman-favourite-settings-service.service';
import { FilemanMetadataService } from './services/fileman-metadata-service.service';
import { FilemanFileService } from './services/fileman-file-service.service';
import { FilemanErrorHandler } from './common/fileman-error-handler';
import { FilemanProblemPageComponent } from './components/fileman-problem-page/fileman-page-not-found.component';
import { FilemanHistoryViewComponent } from './components/fileman-history-view/fileman-history-view.component';
import { FilemanTooltipOptions } from './common/fileman-constants';
import { FilemetadataDetailsComponent } from './components/details/fileman-filemetadata-details/fileman-filemetadata-details.component';
import { FilemetadataListLayout } from './components/layout/filemetadata/list-layout/fileman-filemetadata-list-layout-component';
import { FilemetadataTableLayout } from './components/layout/filemetadata/table-layout/fileman-filemetadata-table-layout-component';
import { FilemetadataTilesLayout } from './components/layout/filemetadata/tiles-layout/fileman-filemetadata-tiles-layout-component';

import { UserListLayout } from './components/layout/user/list-layout/fileman-user-list-layout-component';
import { UserTableLayout } from './components/layout/user/table-layout/fileman-user-table-layout-component';
import { UserTilesLayout } from './components/layout/user/tiles-layout/fileman-user-tiles-layout-component';
import { UserService } from './services/fileman-user-service';

@NgModule({
  declarations: [
    AppComponent,
    MydatePipe,
    FormatDateDirective,
    OutsideClickListenerDirective,
    FilemanLoginComponent,
    FilemetadataDetailsComponent,
    FilemanOverviewComponent,
    FilemanToolbarComponent,
    FilemanProblemPageComponent,
    FilemanSortIconComponent,
    FilemanLogoComponent,
    FilemanHistoryViewComponent,
    UserListLayout, UserTableLayout, UserTilesLayout,
    FilemetadataListLayout, FilemetadataTableLayout, FilemetadataTilesLayout
  ],
  imports: [
    MatIconModule, MatTooltipModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatToolbarModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    PdfViewerModule, NgxDocViewerModule,
    TooltipModule.forRoot(FilemanTooltipOptions as TooltipOptions),
    RouterModule.forRoot([
      {path: '', redirectTo: '/fileman', pathMatch: 'full'},
      {path: 'fileman', component: FilemanLoginComponent},
      {path: 'fileman/login', component: FilemanLoginComponent},
      {path: 'fileman/overview', component: FilemanOverviewComponent, canActivate: [AuthGuard]},
      {path: 'fileman/history/:filename', component: FilemanHistoryViewComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/details/:filename', component: FilemetadataDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/files/new', component: FilemetadataDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/problem', component: FilemanProblemPageComponent},
      {path: 'fileman/**', component: FilemanProblemPageComponent}
    ])
  ],
  providers: [
    AuthGuard, AdminAuthGuard,
    HttpClientTestingModule,
    UserService,
    FilemanMetadataService, FilemanFavouriteSettingsService, FilemanFileService,
    {provide: ErrorHandler, useClass: FilemanErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }