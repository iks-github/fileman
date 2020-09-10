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
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormatDateDirective } from './directives/format-date.directive';
import { OutsideClickListenerDirective } from './directives/outside-click-listener.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { AppComponent } from './app.component';
import { MydatePipe } from './directives/mydate.pipe';
import { FilemanAuthInterceptor } from './common/fileman-auth-interceptor'

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthGuard } from './services/guard/auth-guard.service';
import { WriterAuthGuard } from './services/guard/writer-auth-guard.service';
import { AdminAuthGuard } from './services/guard/admin-auth-guard.service';

import { FilemanLogoComponent } from './components/fileman-logo.component';
import { FilemanLoginComponent } from './components/fileman-login/fileman-login.component';
import { FilemanOverviewComponent } from './components/fileman-overview/fileman-overview.component';
import { FilemanFileOverviewComponent } from './components/fileman-overview/files/fileman-file-overview.component';
import { FilemanUserOverviewComponent } from './components/fileman-overview/users/fileman-user-overview.component';
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
import { UserDetailsComponent } from './components/details/fileman-user-details/fileman-user-details.component';
import { FilemetadataListLayout } from './components/layout/filemetadata/list-layout/fileman-filemetadata-list-layout-component';
import { FilemetadataTableLayout } from './components/layout/filemetadata/table-layout/fileman-filemetadata-table-layout-component';
import { FilemetadataTilesLayout } from './components/layout/filemetadata/tiles-layout/fileman-filemetadata-tiles-layout-component';
import { UserListLayout } from './components/layout/user/list-layout/fileman-user-list-layout-component';
import { UserTableLayout } from './components/layout/user/table-layout/fileman-user-table-layout-component';
import { UserTilesLayout } from './components/layout/user/tiles-layout/fileman-user-tiles-layout-component';
import { UserService } from './services/fileman-user-service.service';

import { TenantDetailsComponent } from './components/details/fileman-tenant-details/fileman-tenant-details.component';
import { FilemanTenantOverviewComponent } from './components/fileman-overview/tenants/fileman-tenant-overview.component';
import { TenantListLayout } from './components/layout/tenant/list-layout/fileman-tenant-list-layout-component';
import { TenantTableLayout } from './components/layout/tenant/table-layout/fileman-tenant-table-layout-component';
import { TenantTilesLayout } from './components/layout/tenant/tiles-layout/fileman-tenant-tiles-layout-component';
import { TenantService } from './services/fileman-tenant-service.service';

import { FileGroupDetailsComponent } from './components/details/fileman-filegroup-details/fileman-filegroup-details.component';
import { FilemanFileGroupOverviewComponent } from './components/fileman-overview/fileGroups/fileman-fileGroup-overview.component';
import { FileGroupListLayout } from './components/layout/fileGroup/list-layout/fileman-fileGroup-list-layout-component';
import { FileGroupTableLayout } from './components/layout/fileGroup/table-layout/fileman-fileGroup-table-layout-component';
import { FileGroupTilesLayout } from './components/layout/fileGroup/tiles-layout/fileman-fileGroup-tiles-layout-component';
import { FileGroupService } from './services/fileman-filegroup-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MydatePipe,
    FormatDateDirective,
    OutsideClickListenerDirective,
    FilemanLoginComponent,
    FilemetadataDetailsComponent,
    UserDetailsComponent,
    FilemanOverviewComponent,
    FilemanFileOverviewComponent,
    FilemanUserOverviewComponent,
    FilemanToolbarComponent,
    FilemanProblemPageComponent,
    FilemanSortIconComponent,
    FilemanLogoComponent,
    FilemanHistoryViewComponent,
    UserListLayout, UserTableLayout, UserTilesLayout,
    TenantDetailsComponent,
    FilemanTenantOverviewComponent,
    TenantListLayout, TenantTableLayout, TenantTilesLayout,
    FileGroupDetailsComponent,
    FilemanFileGroupOverviewComponent,
    FileGroupListLayout, FileGroupTableLayout, FileGroupTilesLayout,
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
      {path: 'fileman/history/:filename', component: FilemanHistoryViewComponent, canActivate: [AuthGuard]},
      {path: 'fileman/details/files/:filename', component: FilemetadataDetailsComponent, canActivate: [AuthGuard, WriterAuthGuard]},
      {path: 'fileman/details/users/:username', component: UserDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/files/new', component: FilemetadataDetailsComponent, canActivate: [AuthGuard, WriterAuthGuard]},
      {path: 'fileman/users/new', component: UserDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/tenants/new', component: TenantDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/file-groups/new', component: FileGroupDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'fileman/problem', component: FilemanProblemPageComponent},
      {path: 'fileman/**', component: FilemanProblemPageComponent}
    ])
  ],
  providers: [
    AuthGuard, WriterAuthGuard, AdminAuthGuard,
    HttpClientTestingModule,
    UserService,
    TenantService,
    FileGroupService,
    FilemanMetadataService, FilemanFavouriteSettingsService, FilemanFileService,
    {provide: ErrorHandler, useClass: FilemanErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: FilemanAuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
