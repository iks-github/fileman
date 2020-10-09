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
import { Input, Output, EventEmitter } from '@angular/core';

import { Icon } from 'src/app/common/fileman-constants';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { LayoutCommons } from '../layout-commons';
import { Utils } from 'src/app/common/Utils';
import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';
import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';

export class LayoutFilemetadataCommons extends LayoutCommons {
  @Input() viewedFiles;
  @Input() favouriteSettings;
  @Input() readOnly;
  @Output() fileDownloaded: EventEmitter<FileMetaData> = new EventEmitter<FileMetaData>();
  @Output() fileEdited: EventEmitter<FileMetaData> = new EventEmitter<FileMetaData>();
  @Output() fileDeleted: EventEmitter<FileMetaData> = new EventEmitter<FileMetaData>();
  @Output() fileHistoryShown: EventEmitter<FileMetaData> = new EventEmitter<FileMetaData>();
  @Output() fileFavouriteSettingChanged: EventEmitter<FileMetaData> = new EventEmitter<FileMetaData>();
  readonly iconDownload: string = Icon.Download;
  readonly iconEdit: string = Icon.Edit;
  readonly iconDelete = Icon.Delete;
  readonly iconShowHistory = Icon.ShowHistory;

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  download(file: FileMetaData) {
    this.fileDownloaded.emit(file);
  }

  edit(file: FileMetaData) {
    this.fileEdited.emit(file);
  }

  delete(file: FileMetaData) {
    this.fileDeleted.emit(file);
  }

  showHistory(file: FileMetaData) {
    this.fileHistoryShown.emit(file);
  }

  changeFavouriteSetting(file: FileMetaData) {
    this.fileFavouriteSettingChanged.emit(file);
  }

  getFavouriteIcon(file: FileMetaData) {
    if (this.isFileFavourite(file.getName())) {
      return Icon.FavouriteFilterActive;
    }
    return Icon.FavouriteFilterInactive;
  }

  getFavouriteTooltip(file: FileMetaData): string {
    if (this.isFileFavourite(file.getName())) {
      return 'Click to deselect Favourite';
    }
    return 'Click to select as Favourite';
  }

  isFileFavourite(filename: string): boolean {
    return this.favouriteSettings.has(filename);
  }

  getMetadataHtmlTooltip(file: FileMetaData): string {
    return '<div class="inner-html-enclosing-div"><b>Details:</b>' +
      '<hr>' +
      this.buildHtmlTooltipContentRow('Name', file.name) +
      this.buildHtmlTooltipContentRow('Description', file.description) +
      this.buildHtmlTooltipContentRow('ActiveUUID', ''+file.activeUUID) +
      this.buildHtmlTooltipContentRow('ImmediatelyActive', ''+file.immediatelyActive) +
      this.buildHtmlTooltipContentRow('File Groups',
        this.formatFileGroups(file.fileGroups)) +
      this.buildHtmlTooltipContentRow('TechType', file.techType) +
      this.buildHtmlTooltipContentRow('TechVersion', ''+file.techVersion) +
      this.buildHtmlTooltipContentRow('Creator', file.creator) +
      this.buildHtmlTooltipContentRow('CreationDate',
        "&#8203;" // empty char to prevent date underlining
        + Utils.getFormattedDateString(file.creationDate)) +
      this.buildHtmlTooltipContentRow('Size', ''+file.size)+'</div>'
  }

  formatFileGroups(fileGroups: FileGroup[]): string {
    let fileGroupString: string = '';

    fileGroups.forEach((fileGroup: FileGroup) => {
      if (fileGroupString.length > 0) {
        fileGroupString += ', ';
      }
      fileGroupString += fileGroup.name;
    });

    return fileGroupString;
  }
}
