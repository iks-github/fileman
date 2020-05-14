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
import { FilemanConstants } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-toolbar',
  templateUrl: './fileman-toolbar.component.html',
  styleUrls: ['./fileman-toolbar.component.css']
})
export class FilemanToolbarComponent implements OnInit {

  @Input() layoutMode = 'list';
  @Input() isFavouriteFilterActive = false;

  @Output('output-alias') layoutChangeHandler = new EventEmitter();
  @Output() logoutHandler = new EventEmitter();
  @Output() searchHandler = new EventEmitter();
  @Output() refreshHandler = new EventEmitter();
  @Output() favouriteFilterHandler = new EventEmitter();

  readOnly: boolean;
  isAdmin: boolean;
  favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
  layoutType = 'list';

  constructor(private authService: FilemanAuthserviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.isAdmin = this.authService.getCurrentUserRole() === 'Admin';
  }

  onLayoutClick(layoutType: string) {
    this.layoutType = layoutType;
    this.layoutChangeHandler.emit(layoutType);
  }

  onNewClick() {
    if (! this.readOnly) {
      this.router.navigate(['/fileman/files/new']);
    }
  }

  onLogout() {
    this.logoutHandler.emit();
  }

  onRefreshClick() {
    this.refreshHandler.emit();
  }

  onFavouriteFilterClick() {
    this.isFavouriteFilterActive = ! this.isFavouriteFilterActive;
    if (this.isFavouriteFilterActive) {
      this.favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_ACTIVE;
    } else {
      this.favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
    }
    this.favouriteFilterHandler.emit(this.isFavouriteFilterActive);
  }

  startSearch(searchString) {
    this.searchHandler.emit(searchString);
  }

  getAddNewToolTip() {
    if (this.readOnly) return "You have no permission to add new files.";
    return "Add new file";
  }

}