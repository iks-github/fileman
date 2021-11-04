import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FileGroup } from '../common/domainobjects/gen/FileGroup';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Utils } from '../common/Utils';

@Injectable({
  providedIn: 'root'
})
export class FileGroupService {
  url;
  private fileGroupDataChangedNotifier: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/fileGroups';
  }

  getAllFileGroups() {
    const uri = this.url;
    return this.httpClient.get<FileGroup[]>(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ), tap(responseData => Utils.sortList(responseData)));
  }

  getFileGroup(id: any) {
    const uri = this.url + '/' + id;
    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ));
  }

  create(fileGroup: FileGroup) {
    const uri = this.url;
    return this.httpClient.post(uri, JSON.stringify(fileGroup), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            throw error; }
                          ), tap(() => this.fileGroupDataChangedNotifier.next()));
  }

  update(fileGroup: FileGroup) {
    const uri = this.url;
    return this.httpClient.put(uri, JSON.stringify(fileGroup), FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            throw error; }
                          ), tap(() => this.fileGroupDataChangedNotifier.next()));
  }

  delete(fileGroup: FileGroup) {
    const uri = this.url + '/' + fileGroup.getId();
    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                          ));
  }

  getFileGroupDataChangedNotifier(): Subject<void> {
    return this.fileGroupDataChangedNotifier;
  }
}