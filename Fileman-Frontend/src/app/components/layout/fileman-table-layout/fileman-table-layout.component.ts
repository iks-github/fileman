import { Component } from '@angular/core';
import { MatSelect } from '@angular/material/select';

import { SortType } from 'src/app/common/fileman-constants';
import { LayoutCommons } from '../layout-commons';

@Component({
  selector: 'fileman-table-layout',
  templateUrl: './fileman-table-layout.component.html',
  styleUrls: ['./fileman-table-layout.component.css']
})
export class FilemanTableLayout extends LayoutCommons {
  openPullDowns: Array<MatSelect> = new Array<MatSelect>();

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

  favouriteAsterix(file: HTMLInputElement) {
    console.log(file.name)
    if (this.isFileFavourite(file.name)) {
      return '*';
    }
    return '';
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

  getFavouriteButtonText(filename: string) {
    if (this.isFileFavourite(filename)) {
      return 'Deselect as Favourite';
    }
    return 'Select as Favourite';
  }
}
