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
import { Component, Input } from '@angular/core';

import { LayoutUserCommons } from '../layout-user-commons';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { PreviewType } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-user-tiles-layout',
  templateUrl: './fileman-user-tiles-layout-component.html',
  styleUrls: ['./fileman-user-tiles-layout-component.css']
})
export class UserTilesLayout extends LayoutUserCommons {
  @Input() allFilesMap;

  constructor(private previewService: FilemanPreviewService) {
    super();
  }

  getDetailsTooltip(user: HTMLInputElement): string {
    const data = this.allFilesMap.get(user.id);
    return data.getStringRepresentation();
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
