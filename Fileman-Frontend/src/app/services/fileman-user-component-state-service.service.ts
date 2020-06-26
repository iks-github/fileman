import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserComponentState } from '../common/domainobjects/gen/UserComponentState';
import { FilemanConstants, Content, Layout } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { FilemanAuthserviceService } from './fileman-authservice.service';

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
  private initializing: boolean = false;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService,
              private authService: FilemanAuthserviceService) {
    this.url = propertiesService.getProperty('serverurl') + '/userComponentStates';
    this.userComponentState = new UserComponentState({
      contentType: this.defaultContentType,
      layoutType: this.defaultLayoutType
    });
    this.userComponentStateChangeNotifier = new Subject<UserComponentState>();
    this.reloadRequestNotifier = new Subject<void>();
  }

  public initializeForUser(userId: number) {
    this.initializing = true;
    this.fetchUserComponentStateFromServer(userId).subscribe(result => {
      const userComponentState: UserComponentState = new UserComponentState(result);
      if (userComponentState.getLayoutType() == null) {
        // no current instance available -> instantiate with default
        userComponentState.setContentType(this.defaultContentType);
        userComponentState.setLayoutType(this.defaultLayoutType);
        userComponentState.setSearchString('');
        userComponentState.setFavouriteFilterActive(false);
        this.create(userComponentState).subscribe(() => {
          this.userComponentState = userComponentState;
          this.userComponentStateChangeNotifier.next(this.userComponentState);
          this.initializing = false;
        });
      } else {
        this.userComponentState = userComponentState;
        this.userComponentStateChangeNotifier.next(this.userComponentState);
        this.initializing = false;
      }
    });
  }

  public getUserComponentState(): UserComponentState {

    // re-initialize if information got lost upon side reload
    if (this.userComponentState.getUserId() == null && !this.initializing) {
      this.initializeForUser(this.authService.getCurrentUserId());
    }

    return this.userComponentState;
  }

  public getContentType(): string {
    return this.getUserComponentState().contentType;
  }

  public setContentType(contentType: string) {
    this.userComponentState.contentType = contentType;
    this.update(this.userComponentState).subscribe(() => {
      this.userComponentStateChangeNotifier.next(this.userComponentState);
    });
  }

  public getLayoutType(): string {
    return this.getUserComponentState().layoutType;
  }

  public setLayoutType(layoutType: string) {
    this.userComponentState.layoutType = layoutType;
    this.update(this.userComponentState).subscribe(() => {
      this.userComponentStateChangeNotifier.next(this.userComponentState);
    });
  }

  public getSearchString(): string {
    return this.getUserComponentState().searchString;
  }

  public setSearchString(searchString: string) {
    this.userComponentState.searchString = searchString;
    this.update(this.userComponentState).subscribe(() => {
      this.userComponentStateChangeNotifier.next(this.userComponentState);
    });
  }

  public getFavouriteFilterActive(): boolean {
    return this.getUserComponentState().favouriteFilterActive;
  }

  public setFavouriteFilterActive(favouriteFilterActive: boolean) {
    this.userComponentState.favouriteFilterActive = favouriteFilterActive;
    this.update(this.userComponentState).subscribe(() => {
      this.userComponentStateChangeNotifier.next(this.userComponentState);
    });
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
