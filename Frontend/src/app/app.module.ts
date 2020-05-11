import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing/';
import { FormatDateDirective } from './format-date.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FilesearchComponent } from './filesearch.component';
import { Filefetcher } from './filefetcher.service';
import { MydatePipe } from './mydate.pipe';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthGuard } from './services/guard/auth-guard.service';
import { AdminAuthGuard } from './services/guard/admin-auth-guard.service';

import { FilemanLogoComponent } from './components/fileman-logo.component';
import { FilemanLoginComponent } from './components/fileman-login/fileman-login.component';
import { FilemanOverviewComponent } from './components/fileman-overview/fileman-overview.component';
import { FilemanToolbarComponent } from './components/fileman-toolbar/fileman-toolbar.component';
import { FilemanSortIconComponent } from './components/fileman-sort-icon/fileman-sort-icon.component';
import { FilemanDetailsComponent } from './components/fileman-details/fileman-details.component';
import { FilemanFavouriteSettingsService } from './services/fileman-favourite-settings-service.service';
import { FilemanMetadataService } from './services/fileman-metadata-service.service';
import { FilemanFileService } from './services/fileman-file-service.service';
import { FilemanErrorHandler } from './common/fileman-error-handler';
import { FilemanProblemPageComponent } from './components/fileman-problem-page/fileman-page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesearchComponent,
    MydatePipe,
    FormatDateDirective,
    FilemanLoginComponent,
    FilemanDetailsComponent,
    FilemanOverviewComponent,
    FilemanToolbarComponent,
    FilemanProblemPageComponent,
    FilemanSortIconComponent,
    FilemanLogoComponent
  ],
  imports: [
    MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", component: FilemanLoginComponent},
      {path: "overview", component: FilemanOverviewComponent, canActivate: [AuthGuard]},
      {path: "details/:filename", component: FilemanDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: "new", component: FilemanDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: "problem", component: FilemanProblemPageComponent},
      {path: "**", component: FilemanProblemPageComponent}
    ])
  ],
  providers: [
    AuthGuard, AdminAuthGuard,
    HttpClientTestingModule,
    Filefetcher, FilemanOverviewComponent,
    FilemanMetadataService, FilemanFavouriteSettingsService, FilemanFileService,
    FilemanToolbarComponent,
    {provide: ErrorHandler, useClass: FilemanErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
