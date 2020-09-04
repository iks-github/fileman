
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { FileMetaData } from '../common/domainobjects/gen/FileMetaData';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanAuthserviceService } from './fileman-authservice.service';

@Injectable({
  providedIn: 'root'
})
export class FilemanMetadataService {
  private url: string;
  private fileMetaDataCache = new Map<string, FileMetaData>();
  private forceReloadFromServer = false;
  private logoutSubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private authService: FilemanAuthserviceService,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl')  + '/fileMetaDatas';
    this.logoutSubscription =
    this.authService.getLogoutNotifier().subscribe(
      () => { this.forceReloadFromServer = true }
    );
  }

  reloadOverviewData(): Observable<FileMetaData[]> {
    this.forceReloadFromServer = true;
    return this.getOverviewData();
  }

  getOverviewData(): Observable<FileMetaData[]> {
    if (this.fileMetaDataCache.size === 0 || this.forceReloadFromServer) {
      console.log('File data loaded from server.');
      return this.getOverviewDataFromServer();
    } else {
      console.log('cache used');
      return new Observable(stream =>
        {
          const array: FileMetaData[] = [];
          this.fileMetaDataCache.forEach((dataset) => {
            array.push(dataset);
          });
          stream.next(array);
          stream.complete();
        }
      );
    }
  }

  protected getOverviewDataFromServer(): Observable<FileMetaData[]> {
    return this.httpClient.get<FileMetaData[]>(this.url)
        .pipe(catchError((error: HttpErrorResponse) => {
          throw error;
        }), tap(() => {
          this.forceReloadFromServer = false;
          console.log("data fetched from server - forceReloadFromServer set to false");
        }));
  }

  markDataAsOutdated() {
    this.forceReloadFromServer = true;
    console.log("data marked as outdated - forceReloadFromServer set to true");
  }

  setFileMetaDataCache(cache: any) {
    this.fileMetaDataCache = cache;
  }

  isNotUnique(filename: string) {
    return this.fileMetaDataCache.has(filename);
  }

  getFileFromCache(filename: string) {
    return this.fileMetaDataCache.get(filename);
  }

  setActive(filename: string, uuid: number) {
    const uri = this.url + '/' + filename + '/uuid/' + uuid;
    console.log('setActive-URL: ' + uri);
    return this.httpClient.put(uri, null, FilemanConstants.getRestCallHeaderOptions())
        .pipe(catchError((error: HttpErrorResponse) => {
          throw error;
        }));
  }
}
