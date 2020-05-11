import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FilemanMetadataService {
  url;

  constructor(private httpClient: HttpClient,
              private propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl')  + '/fileMetaDatas';
  }

  getOverviewData() {
      return this.httpClient.get(this.url)
                            .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                            ));
  }

   isFilenameUnique(filename: string) {
      return this.httpClient.get(this.url + '/' + filename + '/exist')
                            .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                            ));
  }

}
