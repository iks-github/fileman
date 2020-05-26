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

import { FilemanConstants } from 'src/app/common/fileman-constants';

export class LayoutCommons {
  @Input() viewedFiles;
  @Input() favouriteSettings;
  @Input() readOnly;
  @Output() fileDownloaded: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileEdited: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileDeleted: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileHistoryShown: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileFavouriteSettingChanged: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  download(file: HTMLInputElement) {
    this.fileDownloaded.emit(file);
  }

  edit(file: HTMLInputElement) {
    this.fileEdited.emit(file);
  }

  delete(file: HTMLInputElement) {
    this.fileDeleted.emit(file);
  }

  showHistory(file: HTMLInputElement) {
    this.fileHistoryShown.emit(file);
  }

  changeFavouriteSetting(file: HTMLInputElement) {
    this.fileFavouriteSettingChanged.emit(file);
  }

  getFavouriteIcon(file: HTMLInputElement) {
    if (this.isFileFavourite(file.name)) {
      return FilemanConstants.ICON_FAVOURITE_FILTER_ACTIVE;
    }
    return FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
  }

  getFavouriteTooltip(file: HTMLInputElement): string {
    if (this.isFileFavourite(file.name)) {
      return 'Click to deselect Favourite';
    }
    return 'Click to select as Favourite';
  }

  isFileFavourite(filename): boolean {
    return this.favouriteSettings.has(filename);
  }
}
