import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilemanConstants } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-list-layout',
  templateUrl: './fileman-list-layout.component.html',
  styleUrls: ['./fileman-list-layout.component.css']
})
export class FilemanListLayout {

  @Input() viewedFiles;
  @Input() allFilesMap;
  @Input() favouriteSettings;
  @Input() readOnly;
  @Output() fileDownloaded: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileEdited: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileDeleted: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileHistoryShown: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileMarkedAsFavourite: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();

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

  markFavourite(file: HTMLInputElement) {
    this.fileMarkedAsFavourite.emit(file);
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

  getDetailsTooltip(file: HTMLInputElement): string {
    const data = this.allFilesMap.get(file.name);
    return data.getStringRepresentation();
  }

  private isFileFavourite(filename) {
    return this.favouriteSettings.has(filename);
  }
}
