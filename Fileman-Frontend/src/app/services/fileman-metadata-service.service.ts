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
import { catchError } from 'rxjs/operators';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { Subject } from 'rxjs/internal/Subject';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class FilemanMetadataService {
  url;

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl')  + '/fileMetaDatas';
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getOverviewData() {
      return this.httpClient.get(this.url)
                            .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                            ));
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  reload() {
    return this.getOverviewData();
  }

  fetchUpdatesFromCacheBuster() {
    cacheBuster$.next();
  }
}
