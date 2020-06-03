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
import { Component } from '@angular/core';

import { LayoutCommons } from '../layout-commons';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { PreviewType } from 'src/app/common/fileman-constants';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';

@Component({
  selector: 'fileman-tiles-layout',
  templateUrl: './fileman-tiles-layout.component.html',
  styleUrls: ['./fileman-tiles-layout.component.css']
})
export class FilemanTilesLayout extends LayoutCommons {
  constructor(private previewService: FilemanPreviewService) {
    super();
  }

  getDetailsTooltip(file: FileMetaData): string {
    return this.getMetadataHtmlTooltip(file);
  }

  hasImagePreview(fileName: string): boolean {
    return this.previewService.hasPreview(PreviewType.Image, fileName);
  }

  getImagePreview(fileName: string): string {
    return this.previewService.getPreviewData(PreviewType.Image, fileName);
  }

  hasTextPreview(fileName: string): boolean {
    return this.previewService.hasPreview(PreviewType.Text, fileName);
  }

  getTextPreview(fileName: string): string {
    return this.previewService.getPreviewData(PreviewType.Text, fileName);
  }

  hasDocxPreview(fileName: string): boolean {
    return this.previewService.hasPreview(PreviewType.DOCX, fileName);
  }

  getDocxPreview(fileName: string): string {
    return this.previewService.getPreviewData(PreviewType.DOCX, fileName);
  }

  hasPdfPreview(fileName: string): boolean {
    return this.previewService.hasPreview(PreviewType.PDF, fileName);
  }

  getPdfPreview(fileName: string): string {
    return this.previewService.getPreviewData(PreviewType.PDF, fileName);
  }
}
