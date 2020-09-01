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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Content, Layout, Icon, UserRole } from 'src/app/common/fileman-constants';
import { FilemanPropertiesLoaderService } from 'src/app/services/fileman-properties-loader.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';
import { FilemanSearchService } from 'src/app/services/fileman-search-service.service';
import { FilemanReloadService } from 'src/app/services/fileman-reload-service.service';

@Component({
  selector: 'fileman-toolbar',
  templateUrl: './fileman-toolbar.component.html',
  styleUrls: ['./fileman-toolbar.component.css']
})
export class FilemanToolbarComponent implements OnInit {
  readonly contentTypeFiles: string = Content.Files;
  readonly contentTypeUsers: string = Content.Users;
  readonly contentTypeTenants: string = Content.Tenants;
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;
  readonly iconList: string = Icon.List;
  readonly iconTable: string = Icon.Table;
  readonly iconTiles: string = Icon.Tiles;
  readonly iconNew: string = Icon.New;
  readonly iconReload: string = Icon.Reload;
  readonly iconDatabase: string = Icon.Database;
  readonly iconLogout: string = Icon.Logout;

  readOnly: boolean;
  isAdmin: boolean;
  userPreferences: UserPreferences;
  userPreferencesSubscription: Subscription;
  showFavouriteIcon: boolean = true;
  favouriteFilterIcon = Icon.FavouriteFilterInactive;

  constructor(private authService: FilemanAuthserviceService,
              private router: Router,
              private propertiesService: FilemanPropertiesLoaderService,
              private userPreferencesService: FilemanUserPreferencesService,
              private searchService: FilemanSearchService,
              private reloadService: FilemanReloadService) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.isAdmin = this.authService.getCurrentUserRole() === UserRole.Admin;
    this.userPreferences = this.userPreferencesService.getUserPreferences();
    this.userPreferencesSubscription =
      this.userPreferencesService.getUserPreferencesChangeNotifier().subscribe(
        (userPreferences: UserPreferences) => {
          this.userPreferences = userPreferences;
          this.updateLayoutForUserPreferences(userPreferences);
        }
      );
  }

  updateLayoutForUserPreferences(userPreferences: UserPreferences) {
    if (userPreferences.contentType == this.contentTypeUsers) {
      this.showFavouriteIcon = false;
    } else {
      this.showFavouriteIcon = true;
    }

    if (userPreferences.favouriteFilterActive) {
      this.favouriteFilterIcon = Icon.FavouriteFilterActive;
    } else {
      this.favouriteFilterIcon = Icon.FavouriteFilterInactive;
    }
  }

  onLayoutClick(layoutType: string) {
    this.userPreferencesService.setLayoutType(layoutType);
  }

  onContentTypeChange(contentType: string) {
    this.userPreferencesService.setContentType(contentType);
  }

  onNewClick() {
    if (! this.readOnly) {
      if (this.userPreferences.contentType === this.contentTypeFiles) {
        this.router.navigate(['/fileman/files/new']);
      } else if (this.userPreferences.contentType === this.contentTypeUsers) {
        this.router.navigate(['/fileman/users/new']);
      } else if (this.userPreferences.contentType === this.contentTypeTenants) {
        this.router.navigate(['/fileman/tenants/new']);
      }
    }
  }

  onLogout() {
    this.router.navigate(['/fileman']);
    this.authService.logout();
    console.log('Logged out!');
  }

  onReloadClick() {
    this.reloadService.requestReload();
  }

  onFavouriteFilterClick() {
    const favouriteFilterActive: boolean =
      !this.userPreferences.favouriteFilterActive;

    this.userPreferencesService.setFavouriteFilterActive(favouriteFilterActive);
  }

  getSearchString(): string {
    return this.searchService.getSearchString();
  }

  startSearch(searchString) {
    this.searchService.setSearchString(searchString);
  }

  getAddNewToolTip() {
    if (this.userPreferences.contentType === this.contentTypeUsers) {
      return 'Add new user';
    } else if (this.userPreferences.contentType === this.contentTypeTenants) {
      return 'Add new tenant';
    } else {
      if (this.readOnly) {
        return 'You have no permission to add new files.';
      }
      return 'Add new file';
    }
  }

  openDbLink() {
    window.open(this.propertiesService.getProperty('dburl'), '_blank');
  }
}
