import { HttpHeaders } from '@angular/common/http';
// import sampleData from './properties.json';
// import * as data from './properties.json';

export enum SortType {ASC = 'asc', DESC = 'desc'}

export class FilemanConstants
{
  static ICON_FAVOURITE_FILTER_ACTIVE = 'star';
  static ICON_FAVOURITE_FILTER_INACTIVE = 'star_border';

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
