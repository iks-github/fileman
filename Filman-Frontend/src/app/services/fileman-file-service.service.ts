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
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilemanConstants } from '../common/fileman-constants';
import { FileData } from '../common/domainobjects/gen/FileData';

@Injectable({
  providedIn: 'root'
})
export class FilemanFileService {
  url;

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/files';
  }

    create(fileData: FileData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });
    const options = { headers };

    return this.httpClient.post(this.url, JSON.stringify(fileData), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(fileData: FileData) {
    const uri = this.url + '/' + fileData.getMetaData().getName();
    // console.log(uri);
    return this.httpClient.put(uri, JSON.stringify(fileData), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(file: HTMLInputElement) {
    const uri = this.url + '/' + file.name;
    // console.log(uri);
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

  download(file: HTMLInputElement): Observable<Blob> {
    const uri = this.url + '/' + file.name;
    // console.log(uri);
    return this.httpClient.get(uri, {responseType: 'blob'})
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                           ));
  }

}