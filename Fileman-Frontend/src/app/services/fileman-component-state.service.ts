import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { FilemanConstants } from '../common/fileman-constants';

@Injectable({
  providedIn: 'root'
})
export class FilemanComponentStateService {

  private overviewLayoutType: string = FilemanConstants.OVERVIEW_LAYOUT_TYPE_LIST;
  private overviewLayoutTypeChangeNotifier: Subject<string> = new Subject<string>();

  public getOverviewLayoutType(): string {
    return this.overviewLayoutType;
  }

  public setOverviewLayoutType(overviewLayoutType: string) {
    this.overviewLayoutType = overviewLayoutType;
    this.overviewLayoutTypeChangeNotifier.next(this.overviewLayoutType);
  }

  public getOverviewLayoutTypeChangeNotifier(): Subject<string> {
    return this.overviewLayoutTypeChangeNotifier;
  }
}
