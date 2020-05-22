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
import { HttpHeaders } from '@angular/common/http';
// import sampleData from './properties.json';
// import * as data from './properties.json';

export enum SortType {ASC = 'asc', DESC = 'desc'}

export class FilemanConstants
{
  static ICON_FAVOURITE_FILTER_ACTIVE: string = 'star';
  static ICON_FAVOURITE_FILTER_INACTIVE: string = 'star_border';

  static OVERVIEW_LAYOUT_TYPE_LIST: string = 'overview_layout_type_list';
  static OVERVIEW_LAYOUT_TYPE_TABLE: string = 'overview_layout_type_table';
  static OVERVIEW_LAYOUT_TYPE_TILES: string = 'overview_layout_type_tiles';

  public static getRestCallHeaderOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers };
  }

  // public static getProperty(key) {
  //   return sampleData.get(key);
  // }
}
