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
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import * as mammoth from 'mammoth/mammoth.browser.js';

import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { PreviewType } from '../common/fileman-constants';

@Injectable({
  providedIn: 'root'
})
export class FilemanPreviewService {
  url;
  namesOfAlreadyPreviewedFiles: Array<string>;
  previews: Map<string, string>;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/files';
    this.namesOfAlreadyPreviewedFiles = new Array<string>();
    this.previews = new Map<string, string>();
  }

  preparePreview(fileName: string) {
    if (this.namesOfAlreadyPreviewedFiles.includes(fileName)) {
      return;
    }

    this.fetchFileFromServer(fileName).subscribe(blobResponse => {
      if (fileName.endsWith('jpg') || fileName.endsWith('jpeg')) {
        const file = new Blob([blobResponse], { type: 'image/jpeg' });
        this.createBinaryFilePreview(fileName, file, PreviewType.Image);
      } else if (fileName.endsWith('png')) {
        const file = new Blob([blobResponse], { type: 'image/png' });
        this.createBinaryFilePreview(fileName, file, PreviewType.Image);
      } else if (fileName.endsWith('docx')) {
        const file = new Blob([blobResponse], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        //this.createDocxHtmlPreview(fileName, file);
        this.createBinaryFilePreview(fileName, file, PreviewType.DOCX);
      } else if (fileName.endsWith('pdf')) {
        const file = new Blob([blobResponse], { type: 'application/pdf' });
        this.createBinaryFilePreview(fileName, file, PreviewType.PDF);
      } else {
        const file = new Blob([blobResponse], { type:'text/plain', endings:'native' });
        this.createTextFilePreview(fileName, file);
      }
    });
  }

  createBinaryFilePreview(fileName: string, file: Blob, previewType: PreviewType) {
    const reader = new FileReader();

    reader.onload = () => {
      this.namesOfAlreadyPreviewedFiles.push(fileName);
      this.previews.set(this.getPreviewsKey(previewType, fileName), reader.result as string);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  createTextFilePreview(fileName: string, file: Blob) {
    file.text().then((textContent) => {
      this.namesOfAlreadyPreviewedFiles.push(fileName);
      this.previews.set(this.getPreviewsKey(PreviewType.Text, fileName), textContent);
    });
  }

  /*
  createDocxHtmlPreview(fileName: string, file: Blob) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {

      var arrayBuffer = reader.result;

      mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        console.log(resultObject);
        this.documentPreviews.set(fileName, resultObject.value);
      }.bind(this));
    });

    reader.readAsArrayBuffer(file);
  }*/

  fetchFileFromServer(fileName: string): Observable<Blob> {
    const uri = this.url + '/' + fileName;
    return this.httpClient.get(uri, {responseType: 'blob'})
                          .pipe(catchError((error: HttpErrorResponse) => {
                              throw error; }
                           ));
  }

  hasPreview(previewType: PreviewType, fileName: string): boolean {
    return this.previews.has(this.getPreviewsKey(previewType, fileName));
  }

  getPreviewData(previewType: PreviewType, fileName: string): string {
    return this.previews.get(this.getPreviewsKey(previewType, fileName));
  }

  private getPreviewsKey(previewType: PreviewType, fileName: string): string {
    return fileName+"/"+previewType;
  }
}
