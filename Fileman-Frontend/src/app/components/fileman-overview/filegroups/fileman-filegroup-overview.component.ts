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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FilemanError } from 'src/app/common/errors/fileman-error';
import { FilemanNotfoundError } from 'src/app/common/errors/fileman-not-found-error';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Utils } from 'src/app/common/Utils';
import { Layout, UserRole } from 'src/app/common/fileman-constants';
import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';
import { FileGroupService } from 'src/app/services/fileman-filegroup-service.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';
import { FilemanSearchService } from 'src/app/services/fileman-search-service.service';
import { FilemanReloadService } from 'src/app/services/fileman-reload-service.service';

@Component({
  selector: 'fileman-filegroup-overview',
  templateUrl: './fileman-filegroup-overview.component.html',
  styleUrls: ['./fileman-filegroup-overview.component.css']
})
export class FilemanFileGroupOverviewComponent implements OnInit, OnDestroy {
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;

  userPreferences: UserPreferences;
  userPreferencesSubscription: Subscription;
  searchString: string;
  searchStringSubscription: Subscription;
  reloadRequestSubscription: Subscription;
  fileGroupDataChangedSubscription: Subscription;
  responseData;
  allFileGroupsMap = new Map<string, FileGroup>();
  viewedFileGroups = [] as FileGroup[];
  readOnly: boolean;
  currentUserName;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private fileGroupService: FileGroupService,
              private userPreferencesService: FilemanUserPreferencesService,
              private searchService: FilemanSearchService,
              private reloadService: FilemanReloadService) {
                  console.log('########### overview constr');
              }

  ngOnInit(): void {
    console.log('### fileGroup overview init')
    this.currentUserName = this.authService.getCurrentUserName();
    this.userPreferences = this.userPreferencesService.getUserPreferences();
    this.userPreferencesSubscription =
      this.userPreferencesService.getUserPreferencesChangeNotifier().subscribe(
        (userPreferences: UserPreferences) => {
          this.userPreferences = userPreferences;
          this.searchFor(this.searchString);
        }
      );
    this.searchString = this.searchService.getSearchString();
    this.searchStringSubscription =
      this.searchService.getSearchStringChangeNotifier().subscribe(
        (searchString: string) => this.searchFor(searchString)
      );
    this.fileGroupService.getAllFileGroups()
        .subscribe(responseData => {this.extractFileGroups(responseData)});
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.reloadRequestSubscription =
      this.reloadService.getReloadRequestNotifier().subscribe(
        () => this.reload()
      );
    this.fileGroupDataChangedSubscription =
      this.fileGroupService.getFileGroupDataChangedNotifier().subscribe(
        () => this.reload()
      );
  }

  isFileGroupNameUnique(fileGroupName: string) {
    return this.allFileGroupsMap.has(fileGroupName);
  }

  reload() {
    this.allFileGroupsMap.clear();
    this.fileGroupService.getAllFileGroups()
        .subscribe(responseData => {this.extractFileGroups(responseData)});
  }

  extractFileGroups(responseData) {
    this.responseData = responseData;
    const fileGroups = [] as FileGroup[];
    this.responseData.forEach(element => {
      const dataset = new FileGroup(element);
      fileGroups.push(dataset);
      this.allFileGroupsMap.set(dataset.getName(), dataset)
    });
    this.viewedFileGroups = Utils.sortList(fileGroups);
    this.searchFor(this.searchString);
  }

  edit(fileGroup: FileGroup) {
    this.router.navigate(['/fileman/details/fileGroups/' + fileGroup.getId()]);
  }

  searchFor(searchString: string) {
    this.searchString = searchString;
    const fileGroupList = [];

    this.allFileGroupsMap.forEach(fileGroup => {
      if (fileGroup.getName().indexOf(searchString) !== -1) {
        fileGroupList.push(fileGroup);
      }
    });

    this.viewedFileGroups = fileGroupList;
  }

  delete(fileGroup: FileGroup) {
    const ok = confirm('Are you sure to delete "' + fileGroup.getName() + '"?');
    if (! ok) {return;}
    const toDelete = this.allFileGroupsMap.get(fileGroup.getName());
    this.allFileGroupsMap.delete(fileGroup.getName());
    const index = this.viewedFileGroups.indexOf(toDelete);
    this.viewedFileGroups.splice(index, 1);  // optimistic deletion

    this.fileGroupService
        .delete(fileGroup)
        .subscribe(
          deletedFileGroup => {
              console.log('Successfully deleted fileGroup: ' + fileGroup.getName());
            },
          (error: FilemanError) => {
            this.viewedFileGroups.splice(index, 0, toDelete);  // roll back optimistic deletion
            this.allFileGroupsMap.set(toDelete.getName(), toDelete);

            if (error instanceof FilemanNotfoundError) {
              // TODO this.form.setErrors(error.cause);
              alert('FileGroup does not (more?) exist.')
            } else {
              throw error;
            }
          }
        );
  }

  ngOnDestroy() {
    this.userPreferencesSubscription.unsubscribe();
    this.searchStringSubscription.unsubscribe();
    this.reloadRequestSubscription.unsubscribe();
    this.fileGroupDataChangedSubscription.unsubscribe();
  }
}
