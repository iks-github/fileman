import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FilemanConstants, Content, Layout } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { FilemanAuthserviceService } from './fileman-authservice.service';
import { UserPreferences } from '../common/domainobjects/gen/UserPreferences';

@Injectable({
  providedIn: 'root'
})
export class FilemanUserPreferencesService {
  private readonly defaultContentType: string = Content.Files;
  private readonly defaultLayoutType: string = Layout.List;

  private url: string;
  private userPreferences: UserPreferences;
  private userPreferencesChangeNotifier: Subject<UserPreferences>;
  private initializing: boolean = false;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService,
              private authService: FilemanAuthserviceService) {
    this.url = propertiesService.getProperty('serverurl') + '/userPreferences';
    this.userPreferences = new UserPreferences({
      contentType: this.defaultContentType,
      layoutType: this.defaultLayoutType
    });
    this.userPreferencesChangeNotifier = new Subject<UserPreferences>();
  }

  public initializeForUser(userId: number) {
    this.initializing = true;
    this.fetchUserPreferencesFromServer(userId).subscribe(result => {
      const userPreferences: UserPreferences = new UserPreferences(result);
      if (userPreferences.getLayoutType() == null) {
        // no current instance available -> instantiate with default
        userPreferences.setContentType(this.defaultContentType);
        userPreferences.setLayoutType(this.defaultLayoutType);
        userPreferences.setFavouriteFilterActive(false);
        this.create(userPreferences).subscribe(() => {
          this.userPreferences = userPreferences;
          this.userPreferencesChangeNotifier.next(this.userPreferences);
          this.initializing = false;
        });
      } else {
        this.userPreferences = userPreferences;
        this.userPreferencesChangeNotifier.next(this.userPreferences);
        this.initializing = false;
      }
    });
  }

  public getUserPreferences(): UserPreferences {

    // re-initialize if information got lost upon side reload
    if (this.userPreferences.getUserId() == null && !this.initializing) {
      this.initializeForUser(this.authService.getCurrentUserId());
    }

    return this.userPreferences;
  }

  public getContentType(): string {
    return this.getUserPreferences().contentType;
  }

  public setContentType(contentType: string) {
    this.userPreferences.contentType = contentType;
    this.update(this.userPreferences).subscribe(() => {
      this.userPreferencesChangeNotifier.next(this.userPreferences);
    });
  }

  public getLayoutType(): string {
    return this.getUserPreferences().layoutType;
  }

  public setLayoutType(layoutType: string) {
    this.userPreferences.layoutType = layoutType;
    this.update(this.userPreferences).subscribe(() => {
      this.userPreferencesChangeNotifier.next(this.userPreferences);
    });
  }

  public getFavouriteFilterActive(): boolean {
    return this.getUserPreferences().favouriteFilterActive;
  }

  public setFavouriteFilterActive(favouriteFilterActive: boolean) {
    this.userPreferences.favouriteFilterActive = favouriteFilterActive;
    this.update(this.userPreferences).subscribe(() => {
      this.userPreferencesChangeNotifier.next(this.userPreferences);
    });
  }

  public getUserPreferencesChangeNotifier(): Subject<UserPreferences> {
    return this.userPreferencesChangeNotifier;
  }

  fetchUserPreferencesFromServer(userId: any) {
    const uri = this.url + '/' + userId;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(userPreferences: UserPreferences) {
    const uri = this.url;
    return this.httpClient.post(uri, JSON.stringify(userPreferences), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(userPreferences: UserPreferences) {
    const uri = this.url;
    return this.httpClient.put(uri, JSON.stringify(userPreferences), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(userPreferences: UserPreferences) {
    const uri = this.url + '/' + userPreferences.getUserId();
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }
}
