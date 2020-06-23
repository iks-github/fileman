import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserComponentState } from '../common/domainobjects/gen/UserComponentState';
import { FilemanConstants, Content, Layout } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserComponentStateService {
  url;
  private contentType: string = Content.Files;
  private contentTypeChangeNotifier: Subject<string> = new Subject<string>();

  private layoutType: string = Layout.List;
  private layoutTypeChangeNotifier: Subject<string> = new Subject<string>();

  private searchString: string = '';
  private searchStringChangeNotifier: Subject<string> = new Subject<string>();

  private favouriteFilterActive: boolean;
  private favouriteFilterActiveChangeNotifier: Subject<boolean> = new Subject<boolean>();

  private reloadRequestNotifier: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/userComponentStates';
  }

  public getContentType(): string {
    return this.contentType;
  }

  public setContentType(overviewType: string) {
    this.contentType = overviewType;
    this.contentTypeChangeNotifier.next(this.contentType);
  }

  public getContentTypeChangeNotifier(): Subject<string> {
    return this.contentTypeChangeNotifier;
  }

  public getLayoutType(): string {
    return this.layoutType;
  }

  public setLayoutType(layoutType: string) {
    this.layoutType = layoutType;
    this.layoutTypeChangeNotifier.next(this.layoutType);
  }

  public getLayoutTypeChangeNotifier(): Subject<string> {
    return this.layoutTypeChangeNotifier;
  }

  public getSearchString(): string {
    return this.searchString;
  }

  public setSearchString(searchString: string) {
    this.searchString = searchString;
    this.searchStringChangeNotifier.next(this.searchString);
  }

  public getSearchStringChangeNotifier(): Subject<string> {
    return this.searchStringChangeNotifier;
  }

  public getFavouriteFilterActive(): boolean {
    return this.favouriteFilterActive;
  }

  public setFavouriteFilterActive(favouriteFilterActive: boolean) {
    this.favouriteFilterActive = favouriteFilterActive;
    this.favouriteFilterActiveChangeNotifier.next(this.favouriteFilterActive);
  }

  public getFavouriteFilterActiveChangeNotifier(): Subject<boolean> {
    return this.favouriteFilterActiveChangeNotifier;
  }

  public requestReload() {
    return this.reloadRequestNotifier.next();
  }

  public getReloadRequestNotifier(): Subject<void> {
    return this.reloadRequestNotifier;
  }

  getAllUserComponentStates() {
    const uri = this.url;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  getUserComponentState(userId: any) {
    const uri = this.url + '/' + userId;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(userComponentState: UserComponentState) {
    const uri = this.url;
    return this.httpClient.post(uri, JSON.stringify(userComponentState), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(userComponentState: UserComponentState) {
    const uri = this.url;
    return this.httpClient.put(uri, JSON.stringify(userComponentState), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(userComponentState: UserComponentState) {
    const uri = this.url + '/' + userComponentState.getUserId();
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

}
