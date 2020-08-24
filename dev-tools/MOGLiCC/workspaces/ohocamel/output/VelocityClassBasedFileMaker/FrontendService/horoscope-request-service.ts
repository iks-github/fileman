import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoroscopeRequestData } from '../common/domainobjects/gen/HoroscopeRequestData';
import { OhoConstants } from '../common/domainobjects/oho-constants';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeRequestDataService {
  url = 'localHost:10000/oho/horoscoperequestdata';

  constructor(private httpClient: HttpClient) { }

  loadHoroscopeRequestData(id: any) {
    const uri = this.url + '/' + id;
    // console.log(uri);
    return this.httpClient.get(this.url + '/' + id, OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(data: HoroscopeRequestData) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.post(this.url, JSON.stringify(data), OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  update(data: HoroscopeRequestData) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.put(uri, JSON.stringify(fileData), OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ));
  }

  delete(data: HoroscopeRequestData) {
    const uri = this.url + '/' + data.getId();
    // console.log(uri);
    return this.httpClient.delete(uri, OhoConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

}