import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../common/domainobjects/gen/User';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Utils } from '../common/Utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  private userDataChangedNotifier: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/users';
  }

  getAllUsers() {
    const uri = this.url;
    return this.httpClient.get<User[]>(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(tap(responseData => Utils.sortList(responseData)),
                                catchError((error: HttpErrorResponse) => {
                                  throw error; }
                                ));
  }

  getUser(id: any) {
    const uri = this.url + '/' + id;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(user: User) {
    const uri = this.url;
    return this.httpClient.post(uri, JSON.stringify(user), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ), tap(() => this.userDataChangedNotifier.next()));
  }

  update(user: User) {
    const uri = this.url;
    return this.httpClient.put(uri, JSON.stringify(user), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ), tap(() => this.userDataChangedNotifier.next()));
  }

  delete(user: User) {
    const uri = this.url + '/' + user.getId();
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

  getUserDataChangedNotifier(): Subject<void> {
    return this.userDataChangedNotifier;
  }
}
