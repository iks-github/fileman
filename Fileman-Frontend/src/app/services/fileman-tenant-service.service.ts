import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tenant } from '../common/domainobjects/gen/Tenant';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  url;
  private tenantDataChangedNotifier: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/tenants';
  }

  getAllTenants() {
    const uri = this.url;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  getTenant(id: any) {
    const uri = this.url + '/' + id;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(tenant: Tenant) {
    const uri = this.url;
    return this.httpClient.post(uri, JSON.stringify(tenant), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ), tap(() => this.tenantDataChangedNotifier.next()));
  }

  update(tenant: Tenant) {
    const uri = this.url;
    return this.httpClient.put(uri, JSON.stringify(tenant), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ), tap(() => this.tenantDataChangedNotifier.next()));
  }

  delete(tenant: Tenant) {
    const uri = this.url + '/' + tenant.getId();
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

  getTenantDataChangedNotifier(): Subject<void> {
    return this.tenantDataChangedNotifier;
  }
}