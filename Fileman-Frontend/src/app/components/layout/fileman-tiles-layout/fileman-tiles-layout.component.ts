import { Component, Input } from '@angular/core';

import { LayoutCommons } from '../layout-commons';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { PreviewType } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-tiles-layout',
  templateUrl: './fileman-tiles-layout.component.html',
  styleUrls: ['./fileman-tiles-layout.component.css']
})
export class FilemanTilesLayout extends LayoutCommons {
  @Input() allFilesMap;

  constructor(private previewService: FilemanPreviewService) {
    super();
  }

  getDetailsTooltip(file: HTMLInputElement): string {
    const data = this.allFilesMap.get(file.name);
    return data.getStringRepresentation();
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
