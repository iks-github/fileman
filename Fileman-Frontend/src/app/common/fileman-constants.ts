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
export enum Layout {List = 'overview_layout_type_list',
                    Table = 'overview_layout_type_table',
                    Tiles = 'overview_layout_type_tiles'}
export enum PreviewType {Text = 'preview_type_text',
                    Image = 'preview_type_image',
                    PDF = 'preview_type_pdf',
                    DOCX = 'preview_type_docx'}
export enum Icon {List = 'list',
                    Table = 'border_all',
                    Tiles = 'view_module',
                    New = 'note_add',
                    Reload = 'refresh',
                    Search = 'find_in_page',
                    Settings = 'settings',
                    Logout = 'exit_to_app',
                    Download = 'arrow_downwards',
                    Edit = 'edit',
                    Delete = 'delete',
                    ShowHistory = 'layers',
                    FavouriteFilterActive = 'star',
                    FavouriteFilterInactive = 'star_border'}

export class FilemanConstants
{
  static VERSION = '1.0.0';

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
