import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserCredentials } from '../common/domainobjects/fileman-user-credentials';
import { UserAuthData } from '../common/domainobjects/fileman-user-authdata';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilemanAuthserviceService {

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) { }

  login(credentials: UserCredentials): Observable<UserAuthData> {
    const serverurl = this.propertiesService.getProperty('serverurl');
    return this.httpClient.post(serverurl + '/authenticate',
                                JSON.stringify(credentials),
                                FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                                           throw error; } )) as Observable<UserAuthData>;
  }

  logout() {
    console.log('Logged out.');
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const jwtHelper = new JwtHelperService();
    return ! jwtHelper.isTokenExpired(token);
  }

  getCurrentUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) { return null; }
    return new JwtHelperService().decodeToken(token).role;
  }

  getCurrentUserName(): string {
    const token = localStorage.getItem('token');
    if (!token) { return 'unanonymous'; }
    return new JwtHelperService().decodeToken(token).sub;
  }

}
