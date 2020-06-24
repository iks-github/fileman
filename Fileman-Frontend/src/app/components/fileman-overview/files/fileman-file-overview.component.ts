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
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanError } from 'src/app/common/errors/fileman-error';
import { FilemanNotfoundError } from 'src/app/common/errors/fileman-not-found-error';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FilemanFavouriteSettingsService } from 'src/app/services/fileman-favourite-settings-service.service';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { Utils } from 'src/app/common/Utils';
import { Layout, UserRole } from 'src/app/common/fileman-constants';
import { UserComponentStateService } from 'src/app/services/fileman-user-component-state-service.service';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { UserComponentState } from 'src/app/common/domainobjects/gen/UserComponentState';

@Component({
  selector: 'fileman-file-overview',
  templateUrl: './fileman-file-overview.component.html',
  styleUrls: ['./fileman-file-overview.component.css']
})
export class FilemanFileOverviewComponent implements OnInit, OnDestroy {
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;

  userComponentState: UserComponentState;
  userComponentStateSubscription: Subscription;
  reloadRequestSubscription: Subscription;
  responseData;
  allFilesMap = new Map<string, FileMetaData>();
  viewedFiles = [] as FileMetaData[];
  readOnly: boolean;
  favouriteSettingsResponse;
  favouriteSettings = new Map<string, FavouriteSetting>();
  currentUserName;
  fileMetaAttributeNames;
  selectedFile;
  viewFiles: boolean = true;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private filesMetaDataService: FilemanMetadataService,
              private favouriteSettingService: FilemanFavouriteSettingsService,
              private fileService: FilemanFileService,
              private userComponentStateService: UserComponentStateService,
              private previewService: FilemanPreviewService) {
                  console.log('########### overview constr');
              }

  ngOnInit(): void {
    console.log('### file overview init')
    this.currentUserName = this.authService.getCurrentUserName();
    this.userComponentState = this.userComponentStateService.getUserComponentState();
    this.userComponentStateSubscription =
      this.userComponentStateService.getUserComponentStateChangeNotifier().subscribe(
        (userComponentState: UserComponentState) => {
          this.userComponentState = userComponentState;
          this.searchFor(this.userComponentState.searchString);
        }
      );
    this.filesMetaDataService.getOverviewData()
        .subscribe(responseData => {this.extractFiles(responseData)});
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
      this.userComponentStateService.getReloadRequestNotifier().subscribe(
        () => {
          this.reload();
        }
      )
  }

  isFilenameUnique(filename: string) {
    return this.allFilesMap.has(filename);
  }

  reload() {
    this.allFilesMap.clear();
    this.viewedFiles = [] as FileMetaData[];
    this.filesMetaDataService.reloadOverviewData()
        .subscribe(responseData => {this.extractFiles(responseData)});
  }

  extractFiles(responseData) {
    this.responseData = responseData;
    this.responseData.forEach(element => {
      const dataset = new FileMetaData(element);
      this.viewedFiles.push(dataset);
      this.allFilesMap.set(dataset.getName(), dataset)
    });
    this.viewedFiles = Utils.sortList(this.viewedFiles);
    this.filesMetaDataService.setFileMetaDataCache(this.allFilesMap);
    this.updateFilePreviews();
    this.searchFor(this.userComponentState.searchString);
  }

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  edit(file: FileMetaData) {
    this.router.navigate(['/fileman/details/files/' + file.getName()]);
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

  download(file: FileMetaData) {
    this.fileService.download(file.getName()).subscribe(blobResponse => {
      const blob = new Blob([blobResponse], { type: 'text/json; charset=utf-8' });
      saveAs(blob, file.getName());
    });
  }

  searchFor(searchString: string) {
    this.userComponentState.searchString = searchString;
    const fileList = [];

    this.allFilesMap.forEach(file => {
      if (file.getName().indexOf(searchString) !== -1) {
        if (this.userComponentState.favouriteFilterActive) {
          if (this.isFileFavourite(file.getName())) {
            fileList.push(file);
          }
        } else {
            fileList.push(file);
        }
      }
    });

    this.viewedFiles = fileList;
  }

  showHistory(file: FileMetaData) {
    this.router.navigate(['/fileman/history/' + file.getName()]);
  }

  delete(file: FileMetaData) {
    const ok = confirm('Are you sure to delete "' + file.getName() + '"?');
    if (! ok) {return;}
    const toDelete = this.allFilesMap.get(file.getName());
    this.allFilesMap.delete(file.getName());
    const index = this.viewedFiles.indexOf(toDelete);
    this.viewedFiles.splice(index, 1);  // optimistic deletion

    this.fileService
        .delete(file.getName())
        .subscribe(
          deletedFile => {
              console.log('Successfully deleted file: ' + file.getName());
            },
          (error: FilemanError) => {
            this.viewedFiles.splice(index, 0, toDelete);  // roll back optimistic deletion
            this.allFilesMap.set(toDelete.getName(), toDelete);

            if (error instanceof FilemanNotfoundError) {
              // TODO this.form.setErrors(error.cause);
              alert('File does not (more?) exist.')
            } else {
              throw error;
            }
          }
        );
  }

  updateFilePreviews() {
      this.previewService.preparePreviews(this.viewedFiles);
  }

  ngOnDestroy() {
    this.userComponentStateSubscription.unsubscribe();
    this.reloadRequestSubscription.unsubscribe();
  }
}
