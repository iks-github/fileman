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
import { MatSelect } from '@angular/material/select';

import { SortType } from 'src/app/common/fileman-constants';
import { LayoutUserCommons } from '../layout-user-commons';
import { FilemanAvatarService } from 'src/app/services/fileman-avatar-service.service';

@Component({
  selector: 'fileman-user-table-layout',
  templateUrl: './fileman-user-table-layout-component.html',
  styleUrls: ['./fileman-user-table-layout-component.css']
})
export class UserTableLayout extends LayoutUserCommons {
  constructor(private avatarService: FilemanAvatarService) {
    super();
  }

  openPullDowns: Array<MatSelect> = new Array<MatSelect>();

  sort(event) {
    const sortList = this.viewedUsers;
    if (event.sortType === SortType.ASC) {
       this.viewedUsers = sortList.sort((dataObject1, dataObject2) => {
         const value1 = this.getValue(dataObject1, event.sortField);
         const value2 = this.getValue(dataObject2, event.sortField);
         if (value1 < value2) return -1;
        else if (value1 > value2) return 1;
        else return 0;
      });
    } else {
      this.viewedUsers = sortList.sort((dataObject1, dataObject2) => {
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

  hasAvatar(userName: string): boolean {
    return this.avatarService.hasAvatar(userName);
  }

  getAvatar(userName: string): string {
    return this.avatarService.getAvatarData(userName);
  }
}
