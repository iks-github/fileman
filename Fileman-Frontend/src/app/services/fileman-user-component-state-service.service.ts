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
  private readonly defaultContentType: string = Content.Files;
  private readonly defaultLayoutType: string = Layout.List;

  private url: string;
  private userComponentState: UserComponentState;
  private userComponentStateChangeNotifier: Subject<UserComponentState>;
  private reloadRequestNotifier: Subject<void>;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/userComponentStates';
    this.userComponentState = new UserComponentState({
      contentType: this.defaultContentType,
      layoutType: this.defaultLayoutType
    });
    this.userComponentStateChangeNotifier = new Subject<UserComponentState>();
    this.reloadRequestNotifier = new Subject<void>();
  }

  public initializeForUser(userId: number) {
    this.fetchUserComponentStateFromServer(userId).subscribe(result => {
      const userComponentState: UserComponentState = new UserComponentState(result);

      if (userComponentState.getContentType() == null) {
        userComponentState.setContentType(this.defaultContentType);
      }

      if (userComponentState.getLayoutType() == null) {
        userComponentState.setLayoutType(this.defaultLayoutType);
      }

      this.userComponentState = userComponentState;
      this.userComponentStateChangeNotifier.next(this.userComponentState);
    });
  }

  public getUserComponentState(): UserComponentState {
    return this.userComponentState;
  }

  public getContentType(): string {
    return this.userComponentState.contentType;
  }

  public setContentType(overviewType: string) {
    this.userComponentState.contentType = overviewType;
    this.userComponentStateChangeNotifier.next(this.userComponentState);
  }

  public getLayoutType(): string {
    return this.userComponentState.layoutType;
  }

  public setLayoutType(layoutType: string) {
    this.userComponentState.layoutType = layoutType;
    this.userComponentStateChangeNotifier.next(this.userComponentState);
  }

  public getSearchString(): string {
    return this.userComponentState.searchString;
  }

  public setSearchString(searchString: string) {
    this.userComponentState.searchString = searchString;
    this.userComponentStateChangeNotifier.next(this.userComponentState);
  }

  public getFavouriteFilterActive(): boolean {
    return this.userComponentState.favouriteFilterActive;
  }

  public setFavouriteFilterActive(favouriteFilterActive: boolean) {
    this.userComponentState.favouriteFilterActive = favouriteFilterActive;
    this.userComponentStateChangeNotifier.next(this.userComponentState);
  }

  public getUserComponentStateChangeNotifier(): Subject<UserComponentState> {
    return this.userComponentStateChangeNotifier;
  }

  public requestReload() {
    return this.reloadRequestNotifier.next();
  }

  public getReloadRequestNotifier(): Subject<void> {
    return this.reloadRequestNotifier;
  }

  fetchUserComponentStateFromServer(userId: any) {
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
