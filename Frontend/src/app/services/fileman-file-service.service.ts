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
