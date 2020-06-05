import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { User } from '../common/domainobjects/gen/User';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/user';
  }

  getUser(id: any) {
    const uri = this.url + '/' + id;
    // console.log(uri);
    return this.httpClient.get(this.url + '/' + id, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(data: User) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.post(this.url, JSON.stringify(data), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(data: User) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.put(uri, JSON.stringify(data), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(data: User) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

}