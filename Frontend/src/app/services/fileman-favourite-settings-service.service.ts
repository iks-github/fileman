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
