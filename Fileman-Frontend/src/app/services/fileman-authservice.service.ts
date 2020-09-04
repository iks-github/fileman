/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from '../common/domainobjects/gen/LoginRequest';
import { LoginResponse } from '../common/domainobjects/gen/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class FilemanAuthserviceService {
  private logoutNotifier: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) { }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    const serverurl = this.propertiesService.getProperty('serverurl');
    return this.httpClient.post(serverurl + '/authenticate',
                                JSON.stringify(loginData),
                                FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                                           throw error; } )) as Observable<LoginResponse>;
  }

  logout() {
    console.log('Logged out.');
    localStorage.removeItem('token');
    this.logoutNotifier.next();
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

  getCurrentUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) { return null; }
    return new JwtHelperService().decodeToken(token).id;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getLogoutNotifier(): Subject<void> {
    return this.logoutNotifier;
  }
}
