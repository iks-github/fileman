import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { SortType } from 'src/app/common/fileman-constants';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'fileman-table-layout',
  templateUrl: './fileman-table-layout.component.html',
  styleUrls: ['./fileman-table-layout.component.css']
})
export class FilemanTableLayout {
  @Input() viewedFiles;
  @Output() fileDownloaded: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileEdited: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileDeleted: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileHistoryShown: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  @Output() fileMarkedAsFavourite: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();
  openPullDowns: Array<MatSelect> = new Array<MatSelect>();

  constructor(private elementRef: ElementRef) {}

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  sort(event) {
    const sortList = this.viewedFiles;
    if (event.sortType === SortType.ASC) {
       this.viewedFiles = sortList.sort((dataObject1, dataObject2) => {
         const value1 = this.getValue(dataObject1, event.sortField);
         const value2 = this.getValue(dataObject2, event.sortField);
         if (value1 < value2) return -1;
        else if (value1 > value2) return 1;
        else return 0;
      });
    } else {
      this.viewedFiles = sortList.sort((dataObject1, dataObject2) => {
         const value1 = this.getValue(dataObject1, event.sortField);
         const value2 = this.getValue(dataObject2, event.sortField);
         if (value1 > value2) {
          return -1;
        } else if (value1 < value2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  private getValue(dataObject: any, field: string) {
    const fieldNames = Object.keys(dataObject);
    const values = Object.values(dataObject);
    let index = 0;

    for (const fieldName of fieldNames) {
      if (field === fieldName) {
          return values[index];
      }
      index++;
    }
    return null;
  }

  onPullDownOpened(pullDown: MatSelect) {
    if (pullDown.panel != null) {
      this.openPullDowns.push(pullDown);
    }
  }

  closeOpenPullDowns() {
    for (let pullDown of this.openPullDowns) {
      pullDown.close();
    }
    this.openPullDowns.splice(0, this.openPullDowns.length)
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
}
