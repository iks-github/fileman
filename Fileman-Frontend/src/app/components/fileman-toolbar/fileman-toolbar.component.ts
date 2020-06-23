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
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Router } from '@angular/router';
import { Content, Layout, Icon, UserRole } from 'src/app/common/fileman-constants';
import { UserComponentStateService } from 'src/app/services/fileman-user-component-state-service.service';

@Component({
  selector: 'fileman-toolbar',
  templateUrl: './fileman-toolbar.component.html',
  styleUrls: ['./fileman-toolbar.component.css']
})
export class FilemanToolbarComponent implements OnInit {
  readonly contentTypeFiles: string = Content.Files;
  readonly contentTypeUsers: string = Content.Users;
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;
  readonly iconList: string = Icon.List;
  readonly iconTable: string = Icon.Table;
  readonly iconTiles: string = Icon.Tiles;
  readonly iconNew: string = Icon.New;
  readonly iconReload: string = Icon.Reload;
  readonly iconSearch: string = Icon.Search;
  readonly iconSettings: string = Icon.Settings;
  readonly iconLogout: string = Icon.Logout;

  readOnly: boolean;
  isAdmin: boolean;
  layoutType: string;
  contentType: string;
  showFavouriteIcon: boolean = true;
  favouriteFilterActive: boolean;
  favouriteFilterIcon = Icon.FavouriteFilterInactive;

  constructor(private authService: FilemanAuthserviceService,
              private router: Router,
              private userComponentStateService: UserComponentStateService) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.isAdmin = this.authService.getCurrentUserRole() === UserRole.Admin;
    this.layoutType = this.userComponentStateService.getLayoutType();
    this.contentType = this.userComponentStateService.getContentType();
    this.favouriteFilterActive = this.userComponentStateService.getFavouriteFilterActive();
  }

  onLayoutClick(layoutType: string) {
    this.layoutType = layoutType;
    this.userComponentStateService.setLayoutType(layoutType);
  }

  onContentTypeChange(contentType: string) {
    this.contentType = contentType;
    this.userComponentStateService.setContentType(contentType);
    if (contentType == this.contentTypeUsers) {
      this.showFavouriteIcon = false;
    } else {
      this.showFavouriteIcon = true;
    }
  }

  onNewClick() {
    if (! this.readOnly) {
      if (this.contentType === this.contentTypeFiles) {
        this.router.navigate(['/fileman/files/new']);
      } else if (this.contentType === this.contentTypeUsers) {
        this.router.navigate(['/fileman/users/new']);
      }
    }
  }

  onLogout() {
    this.router.navigate(['/fileman']);
    this.authService.logout();
    console.log('Logged out!');
  }

  onReloadClick() {
    this.userComponentStateService.requestReload();
  }

  onFavouriteFilterClick() {
    this.favouriteFilterActive = ! this.favouriteFilterActive;
    if (this.favouriteFilterActive) {
      this.favouriteFilterIcon = Icon.FavouriteFilterActive;
    } else {
      this.favouriteFilterIcon = Icon.FavouriteFilterInactive;
    }
    this.userComponentStateService.setFavouriteFilterActive(this.favouriteFilterActive);
  }

  startSearch(searchString) {
    this.userComponentStateService.setSearchString(searchString);
  }

  getAddNewToolTip() {
    if (this.readOnly) return "You have no permission to add new files.";
    return "Add new file";
  }
}
