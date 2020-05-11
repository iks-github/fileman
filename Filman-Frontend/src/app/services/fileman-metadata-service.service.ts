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
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FilemanMetadataService {
  url;

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl')  + '/fileMetaDatas';
  }

  getOverviewData() {
      return this.httpClient.get(this.url)
                            .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                            ));
  }

   isFilenameUnique(filename: string) {
      return this.httpClient.get(this.url + '/' + filename + '/exist')
                            .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                            ));
  }

}