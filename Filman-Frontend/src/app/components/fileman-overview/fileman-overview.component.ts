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
import { Component, OnInit, Output } from '@angular/core';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanError } from 'src/app/common/errors/fileman-error';
import { FilemanNotfoundError } from 'src/app/common/errors/fileman-not-found-error';
import { FilemanBadRequestError } from 'src/app/common/errors/fileman-bad-request-error';
import { Router } from '@angular/router';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FilemanConstants, SortType } from 'src/app/common/fileman-constants';
import { FilemanFavouriteSettingsService } from 'src/app/services/fileman-favourite-settings-service.service';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { saveAs } from 'file-saver';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';

@Component({
  selector: 'fileman-overview',
  templateUrl: './fileman-overview.component.html',
  styleUrls: ['./fileman-overview.component.css']
})
export class FilemanOverviewComponent implements OnInit {
  static fileCache = new Map<string, FileMetaData>();
  layoutType = 'list';
  responseData;
  allFilesMap = new Map<string, FileMetaData>();
  viewedFiles = [] as FileMetaData[];
  readOnly: boolean;
  favouriteSettingsResponse;
  favouriteSettings = new Map<string, FavouriteSetting>();
  currentUserName;
  isFavouriteFilerOn = false;
  currentSearchString = '';

  constructor(private router: Router,
              public authService: FilemanAuthserviceService,
              private filesMetaDataService: FilemanMetadataService,
              private favouriteSettingService: FilemanFavouriteSettingsService,
              private fileService: FilemanFileService) {}
  
  ngOnInit(): void {
    this.currentUserName = this.authService.getCurrentUserName();
    this.filesMetaDataService.getOverviewData()
                             .subscribe(responseData => { this.responseData = responseData;
                                                          this.responseData.forEach(element => {
                                                            const dataset = new FileMetaData(element);
                                                            this.viewedFiles.push(dataset);
                                                            this.allFilesMap.set(dataset.getName(), dataset)
                                                          });
                                                          FilemanOverviewComponent.fileCache = this.allFilesMap;
                                                        });
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.favouriteSettingService.getAllFavouriteSettings(this.currentUserName)
                                .subscribe(favouriteSettingsResponse => { 
                                    this.favouriteSettingsResponse = favouriteSettingsResponse; 
                                    this.favouriteSettingsResponse.forEach(setting => {
                                      const favouriteSetting = new FavouriteSetting(setting);
                                      this.favouriteSettings.set(favouriteSetting.getFilename(), favouriteSetting);
                                    })
                                });
  }

  addFile(fileMetaData: FileMetaData) {
    //console.log(this.viewedFiles)
    this.viewedFiles.push(fileMetaData)
    this.allFilesMap.set(fileMetaData.getName(), fileMetaData);
    FilemanOverviewComponent.fileCache.delete(fileMetaData.getName());
    FilemanOverviewComponent.fileCache.set(fileMetaData.getName(), fileMetaData);

    //console.log(this.viewedFiles)
  }

  removeFile(fileMetaData: FileMetaData) {
    this.allFilesMap.delete(fileMetaData.getName());
    const index = this.viewedFiles.indexOf(fileMetaData);
    this.viewedFiles.splice(index, 1)
  }
  
  onLayoutClick(layoutType) {
    this.layoutType = layoutType;
  }

  isFilenameUnique(filename: string) {
    return FilemanOverviewComponent.fileCache.has(filename); 
  }

  onLogoutClick() {
    this.router.navigate(['']);
    this.authService.logout();
    console.log('Logged out!');
  }

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  edit(file: HTMLInputElement) {
    this.router.navigate(['/details/' + file.name]);
  }

  getFile(filename: string): FileMetaData {
    return FilemanOverviewComponent.fileCache.get(filename);
  }

  onFavouriteFilterClick(isFilterOn: boolean) {
    this.isFavouriteFilerOn = isFilterOn;
    this.searchFor(this.currentSearchString);
  }

  markFavourite(file: HTMLInputElement)
  {
    if (this.isFileFavourite(file.name))
    {
      // optimistic update
      const toDelete = this.favouriteSettings.get(file.name);
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
      const newSetting = new FavouriteSetting({id: -1, username: this.currentUserName, filename: file.name});
      this.favouriteSettings.set(file.name, newSetting);

      this.favouriteSettingService.createFavouriteSetting(newSetting)
          .subscribe((id) => {
              newSetting.setId(id as number);
            }, (error) => {
              // remove optimistic update due to error
              this.favouriteSettings.delete(file.name);
              alert('Saving favourite setting failed!');
            }
          );
    }
  }

  private isFileFavourite(filename) {
    return this.favouriteSettings.has(filename);
  }

  getFavouriteIcon(file: HTMLInputElement) {
    if (this.isFileFavourite(file.name)) {
      return FilemanConstants.ICON_FAVOURITE_FILTER_ACTIVE;
    }
    return FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
  }

  getFavouriteTooltip(file: HTMLInputElement): string {
    if (this.isFileFavourite(file.name)) {
      return 'Click to deselect Favourite';
    }
    return 'Click to select as Favourite';
  }

  download(file: HTMLInputElement) {
    this.fileService.download(file).subscribe(blobResponse => {
      const blob = new Blob([blobResponse], { type: 'text/json; charset=utf-8' });
      saveAs(blob, file.name);
    });
  }

  searchFor(searchString: string)
  {
    this.currentSearchString = searchString;
    const fileList = [];

    this.allFilesMap.forEach(file => {
      if (file.getName().indexOf(searchString) !== -1) {
        if (this.isFavouriteFilerOn) {
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

  delete(file: HTMLInputElement) {
    const ok = confirm('Are you sure to delete "' + file.name + '"?');
    if (! ok) {return;}
    const toDelete = this.allFilesMap.get(file.name);
    this.allFilesMap.delete(file.name);
    const index = this.viewedFiles.indexOf(toDelete);
    this.viewedFiles.splice(index, 1);  // optimistic deletion

    this.fileService
        .delete(file)
        .subscribe(
          deletedFile => {
              console.log('Successfully deleted file: ' + file.name);
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

  openPullDown(file: HTMLInputElement) {
    // TODO
  }

  sort(event) {
    const sortList = this.viewedFiles;
    if (event.sortType === SortType.ASC) {
       this.viewedFiles = sortList.sort((dataObject1, dataObject2) => {
         const value1 = this.getValue(dataObject1, event.sortField);
         const value2 = this.getValue(dataObject2, event.sortField);
         if (value1 < value2) return -1;
        else if (value1 > value2) return 1;
        else return 0;
      });
    } else {
      this.viewedFiles = sortList.sort((dataObject1, dataObject2) => {
         const value1 = this.getValue(dataObject1, event.sortField);
         const value2 = this.getValue(dataObject2, event.sortField);
         if (value1 > value2) {
          return -1;
        } else if (value1 < value2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  private getValue(dataObject: any, field: string) {
    const fieldNames = Object.keys(dataObject);
    const values = Object.values(dataObject);
    let index = 0;

    for (const fieldName of fieldNames) {
      if (field === fieldName) {
          return values[index];
      }
      index++;
    }
    return null;
  }

}