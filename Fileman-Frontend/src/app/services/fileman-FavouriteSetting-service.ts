import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavouriteSetting } from '../common/domainobjects/gen/FavouriteSetting';
import { OhoConstants } from '../common/domainobjects/oho-constants';

@Injectable({
  providedIn: 'root'
})
export class FavouriteSettingService {
  url = 'localHost:10000/!MetaInfo FOR 'rootPath' NOT FOUND!/favouritesetting';

  constructor(private httpClient: HttpClient) { }

  loadFavouriteSetting(id: any) {
    const uri = this.url + '/' + id;
    // console.log(uri);
    return this.httpClient.get(this.url + '/' + id, OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(data: FavouriteSetting) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.post(this.url, JSON.stringify(data), OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(data: FavouriteSetting) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.put(uri, JSON.stringify(fileData), OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(data: FavouriteSetting) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.delete(uri, OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

}