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

import { LayoutFileGroupCommons } from '../layout-fileGroup-commons';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { PreviewType } from 'src/app/common/fileman-constants';
import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';

@Component({
  selector: 'fileman-fileGroup-tiles-layout',
  templateUrl: './fileman-fileGroup-tiles-layout-component.html',
  styleUrls: ['./fileman-fileGroup-tiles-layout-component.css']
})
export class FileGroupTilesLayout extends LayoutFileGroupCommons {
  constructor(private previewService: FilemanPreviewService) {
    super();
  }

  getDetailsTooltip(fileGroup: FileGroup): string {
    return this.getFileGroupHtmlTooltip(fileGroup);
  }

  hasImagePreview(id: string): boolean {
    return this.previewService.hasPreview(PreviewType.Image, id);
  }

  getImagePreview(id: string): string {
    return this.previewService.getPreviewData(PreviewType.Image, id);
  }

  hasTextPreview(id: string): boolean {
    return this.previewService.hasPreview(PreviewType.Text, id);
  }

  getTextPreview(id: string): string {
    return this.previewService.getPreviewData(PreviewType.Text, id);
  }

  hasDocxPreview(id: string): boolean {
    return this.previewService.hasPreview(PreviewType.DOCX, id);
  }

  getDocxPreview(id: string): string {
    return this.previewService.getPreviewData(PreviewType.DOCX, id);
  }

  hasPdfPreview(id: string): boolean {
    return this.previewService.hasPreview(PreviewType.PDF, id);
  }

  getPdfPreview(id: string): string {
    return this.previewService.getPreviewData(PreviewType.PDF, id);
  }
}