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
import { FilemanFavouriteSettingsService } from 'src/app/services/fileman-favourite-settings-service.service';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { Utils } from 'src/app/common/Utils';
import { Layout, UserRole } from 'src/app/common/fileman-constants';
import { User } from 'src/app/common/domainobjects/gen/User';
import { UserService } from 'src/app/services/fileman-user-service.service';
import { FilemanAvatarService } from 'src/app/services/fileman-avatar-service.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';
import { FilemanSearchService } from 'src/app/services/fileman-search-service.service';
import { FilemanReloadService } from 'src/app/services/fileman-reload-service.service';

@Component({
  selector: 'fileman-user-overview',
  templateUrl: './fileman-user-overview.component.html',
  styleUrls: ['./fileman-user-overview.component.css']
})
export class FilemanUserOverviewComponent implements OnInit, OnDestroy {
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;

  userPreferences: UserPreferences;
  userPreferencesSubscription: Subscription;
  searchString: string;
  searchStringSubscription: Subscription;
  reloadRequestSubscription: Subscription;
  userDataChangedSubscription: Subscription;
  responseData;
  allUsersMap = new Map<string, User>();
  viewedUsers = [] as User[];
  readOnly: boolean;
  favouriteSettingsResponse;
  favouriteSettings = new Map<string, FavouriteSetting>();
  currentUserName;
  fileMetaAttributeNames;
  selectedFile;
  viewFiles: boolean = true;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private userService: UserService,
              private favouriteSettingService: FilemanFavouriteSettingsService,
              private avatarService: FilemanAvatarService,
              private userPreferencesService: FilemanUserPreferencesService,
              private searchService: FilemanSearchService,
              private reloadService: FilemanReloadService) {
                  console.log('########### overview constr');
              }

  ngOnInit(): void {
    console.log('### file overview init')
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
    this.userService.getAllUsers()
        .subscribe(responseData => {this.extractUsers(responseData)});
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.favouriteSettingService.getAllFavouriteSettings(this.currentUserName)
                                .subscribe(favouriteSettingsResponse => {
                                    this.favouriteSettingsResponse = favouriteSettingsResponse;
                                    this.favouriteSettingsResponse.forEach(setting => {
                                      const favouriteSetting = new FavouriteSetting(setting);
                                      this.favouriteSettings.set(favouriteSetting.getFilename(), favouriteSetting);
                                    })
                                });
    this.fileMetaAttributeNames = FileMetaData.getAttributeNames();
    this.reloadRequestSubscription =
      this.reloadService.getReloadRequestNotifier().subscribe(
        () => this.reload()
      );
    this.userDataChangedSubscription =
      this.userService.getUserDataChangedNotifier().subscribe(
        () => this.reload()
      );
  }

  isUsernameUnique(username: string) {
    return this.allUsersMap.has(username);
  }

  reload() {
    this.allUsersMap.clear();
    this.userService.getAllUsers()
        .subscribe(responseData => {this.extractUsers(responseData)});
  }

  extractUsers(responseData) {
    this.responseData = responseData;
    const users = [] as User[];
    this.responseData.forEach(element => {
      const dataset = new User(element);
      users.push(dataset);
      this.allUsersMap.set(dataset.getName(), dataset)
    });
    this.viewedUsers = Utils.sortList(users);
    this.avatarService.preparePreviews(users);
    this.searchFor(this.searchString);
  }

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  edit(user: User) {
    this.router.navigate(['/fileman/details/users/' + user.getId()]);
  }

  markFavourite(file: FileMetaData)
  {
    if (this.isFileFavourite(file.getName()))
    {
      // optimistic update
      const toDelete = this.favouriteSettings.get(file.getName());
      this.favouriteSettings.delete(toDelete.getFilename());
      this.favouriteSettingService.deleteFavouriteSetting(toDelete.getId())
          .subscribe(() => {},
                    (error) => {
                      // remove optimistic update due to error
                      this.favouriteSettings.set(toDelete.getFilename(), toDelete);
                      alert('Saving favourite setting failed!');
                    }
          );
    }
    else
    {
      // optimistic update
      const newSetting = new FavouriteSetting({id: null, username: this.currentUserName, filename: file.getName()});
      this.favouriteSettings.set(file.getName(), newSetting);

      this.favouriteSettingService.createFavouriteSetting(newSetting)
          .subscribe((id) => {
              newSetting.setId(id as number);
            }, (error) => {
              // remove optimistic update due to error
              this.favouriteSettings.delete(file.getName());
              alert('Saving favourite setting failed!');
            }
          );
    }
  }

  private isFileFavourite(filename) {
    return this.favouriteSettings.has(filename);
  }

  searchFor(searchString: string) {
    this.searchString = searchString;
    const userList = [];

    this.allUsersMap.forEach(user => {
      if (user.getName().indexOf(searchString) !== -1) {
        if (this.userPreferences.favouriteFilterActive) {
          if (this.isFileFavourite(user.getName())) {
            userList.push(user);
          }
        } else {
          userList.push(user);
        }
      }
    });

    this.viewedUsers = userList;
  }

  delete(user: User) {
    const ok = confirm('Are you sure to delete "' + user.getName() + '"?');
    if (! ok) {return;}
    const toDelete = this.allUsersMap.get(user.getName());
    this.allUsersMap.delete(user.getName());
    const index = this.viewedUsers.indexOf(toDelete);
    this.viewedUsers.splice(index, 1);  // optimistic deletion

    this.userService
        .delete(user)
        .subscribe(
          deletedUser => {
              console.log('Successfully deleted file: ' + user.getName());
            },
          (error: FilemanError) => {
            this.viewedUsers.splice(index, 0, toDelete);  // roll back optimistic deletion
            this.allUsersMap.set(toDelete.getName(), toDelete);

            if (error instanceof FilemanNotfoundError) {
              // TODO this.form.setErrors(error.cause);
              alert('User does not (more?) exist.')
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
    this.userDataChangedSubscription.unsubscribe();
  }
}
