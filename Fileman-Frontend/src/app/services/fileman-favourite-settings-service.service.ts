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
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { FilemanUrlNotReachable } from '../common/errors/fileman-url-not-reachable-error';
import { FilemanBadRequestError } from '../common/errors/fileman-bad-request-error';
import { FilemanNotfoundError as FilemanNotFoundError } from '../common/errors/fileman-not-found-error';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { FilemanConstants } from '../common/fileman-constants';

@Injectable({
  providedIn: 'root'
})
export class FilemanFavouriteSettingsService {
  url;

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) {
                this.url = propertiesService.getProperty('serverurl');
  }

  getAllFavouriteSettings(userName: string) {
      const uri = this.url + '/favouriteSettings/username/' + userName;
      // console.log('uri: ' + uri)
      return this.httpClient.get(uri)
                      .pipe(catchError((error: HttpErrorResponse) => {
                          throw error; }
                      ));
  }

  createFavouriteSetting(setting: any) {
      const uri = this.url + '/favouriteSettings';
      // console.log('uri: ' + uri)
      return this.httpClient.post(uri, JSON.stringify(setting), FilemanConstants.getRestCallHeaderOptions())
                            .pipe(catchError((error: HttpErrorResponse) => {
                                throw error; }
                            ));
  }

  deleteFavouriteSetting(id: number) {
      const uri = this.url + '/favouriteSettings/' + id;
      // console.log('uri: ' + uri)
      return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                            .pipe(catchError((error: HttpErrorResponse) => {
                               throw error; }
                            ));
  }

}