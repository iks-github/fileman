import { Component, Input } from '@angular/core';
import { SortType } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-table-layout',
  templateUrl: './fileman-table-layout.component.html',
  styleUrls: ['./fileman-table-layout.component.css']
})
export class FilemanTableLayout {
  @Input() viewedFiles;

  trackFiles(index, file) {
    return file ? file.uuid : undefined;
  }

  openPullDown(file: HTMLInputElement) {
    // TODO
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
}
