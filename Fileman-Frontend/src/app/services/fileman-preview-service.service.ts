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

import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { PreviewType } from '../common/fileman-constants';
import { FileMetaData } from '../common/domainobjects/gen/FileMetaData';

@Injectable({
  providedIn: 'root'
})
export class FilemanPreviewService {
  url;
  initialPreviewLoadingDone: boolean;
  previews: Map<string, string>;

  constructor(private httpClient: HttpClient,
              propertiesService: FilemanPropertiesLoaderService) {
    this.url = propertiesService.getProperty('serverurl') + '/files';
    this.initialPreviewLoadingDone = false;
    this.previews = new Map<string, string>();
  }

  preparePreviews(files: FileMetaData[]) {
    if (this.initialPreviewLoadingDone) {
      return;
    }

    files.forEach((file: FileMetaData) => {
      this.preparePreview(file.getName());
    });
    this.initialPreviewLoadingDone = true;
  }

  preparePreview(fileName: string) {
    this.fetchFileFromServer(fileName).subscribe(blobResponse => {
      if (fileName.endsWith('jpg') || fileName.endsWith('jpeg')) {
        const file = new Blob([blobResponse], { type: 'image/jpeg' });
        this.createBinaryFilePreview(fileName, file, PreviewType.Image);
      } else if (fileName.endsWith('png')) {
        const file = new Blob([blobResponse], { type: 'image/png' });
        this.createBinaryFilePreview(fileName, file, PreviewType.Image);
      } else if (fileName.endsWith('bmp')) {
        const file = new Blob([blobResponse], { type: 'image/bmp' });
        this.createBinaryFilePreview(fileName, file, PreviewType.Image);
      } else if (fileName.endsWith('docx')) {
        const file = new Blob([blobResponse], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
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
      this.previews.set(this.getPreviewsKey(previewType, fileName), reader.result as string);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  createTextFilePreview(fileName: string, file: Blob) {
    file.text().then((textContent) => {
      this.previews.set(this.getPreviewsKey(PreviewType.Text, fileName), textContent);
    });
  }

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
