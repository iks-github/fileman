import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { FileGroup } from '../common/domainobjects/gen/FileGroup';

@Injectable({
  providedIn: 'root'
})
export class FilemanSearchService {
  private searchString: string;
  private selectedFileGroups: Set<FileGroup>;
  private searchStringChangeNotifier: Subject<string>;

  constructor() {
    this.searchString = "";
    this.selectedFileGroups = new Set<FileGroup>();
    this.searchStringChangeNotifier = new Subject<string>();
  }

  public getSearchString(): string {
    return this.searchString;
  }

  public getSelectedFileGroups(): Set<FileGroup> {
    return this.selectedFileGroups;
  }

  public setSearchString(searchString: string) {
    this.searchString = searchString;
    this.searchStringChangeNotifier.next(this.searchString);
  }

  public setSelectedFileGroups(selectedFileGroups: Set<FileGroup>) {
    this.selectedFileGroups = selectedFileGroups;
  }

  public getSearchStringChangeNotifier(): Subject<string> {
    return this.searchStringChangeNotifier;
  }
}
