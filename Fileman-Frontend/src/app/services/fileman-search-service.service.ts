import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilemanSearchService {
  private searchString: string;
  private searchStringChangeNotifier: Subject<string>;

  constructor() {
    this.searchString = "";
    this.searchStringChangeNotifier = new Subject<string>();
  }

  public getSearchString(): string {
    return this.searchString;
  }

  public setSearchString(searchString: string) {
    this.searchString = searchString;
    this.searchStringChangeNotifier.next(this.searchString);
  }

  public getSearchStringChangeNotifier(): Subject<string> {
    return this.searchStringChangeNotifier;
  }
}
