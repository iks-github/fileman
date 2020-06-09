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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Router } from '@angular/router';
import { Content, Layout, Icon } from 'src/app/common/fileman-constants';
import { FilemanComponentStateService } from 'src/app/services/fileman-component-state.service';

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
  favouriteFilterActive: boolean;
  favouriteFilterIcon = Icon.FavouriteFilterInactive;

  constructor(private authService: FilemanAuthserviceService,
              private router: Router,
              private componentStateService: FilemanComponentStateService) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.isAdmin = this.authService.getCurrentUserRole() === 'Admin';
    this.layoutType = this.componentStateService.getLayoutType();
    this.contentType = this.componentStateService.getContentType();
    this.favouriteFilterActive = this.componentStateService.getFavouriteFilterActive();
  }

  onLayoutClick(layoutType: string) {
    this.layoutType = layoutType;
    this.componentStateService.setLayoutType(layoutType);
  }

  onContentTypeChange(contentType: string) {
    this.contentType = contentType;
    this.componentStateService.setContentType(contentType);
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
    this.componentStateService.requestReload();
  }

  onFavouriteFilterClick() {
    this.favouriteFilterActive = ! this.favouriteFilterActive;
    if (this.favouriteFilterActive) {
      this.favouriteFilterIcon = Icon.FavouriteFilterActive;
    } else {
      this.favouriteFilterIcon = Icon.FavouriteFilterInactive;
    }
    this.componentStateService.setFavouriteFilterActive(this.favouriteFilterActive);
  }

  startSearch(searchString) {
    this.componentStateService.setSearchString(searchString);
  }

  getAddNewToolTip() {
    if (this.readOnly) return "You have no permission to add new files.";
    return "Add new file";
  }
}
