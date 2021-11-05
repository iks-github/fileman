import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FileGroup } from '../common/domainobjects/gen/FileGroup';

@Injectable({
  providedIn: 'root'
})
export class FilemanSearchService {
  private searchString: string;
  private selectedFileGroups: FileGroup[];
  private isSingleSelectionChecked: boolean = false;
  private isNotSelectionChecked: boolean = false;
  private isAndSelection: boolean = false;
  private searchStringChangeNotifier: Subject<string>;

  constructor() {
    this.searchString = "";
    this.selectedFileGroups = [];
    this.searchStringChangeNotifier = new Subject<string>();
  }

  public getSearchString(): string {
    return this.searchString;
  }

  public getSelectedFileGroups(): FileGroup[] {
    return this.selectedFileGroups;
  }

  public getIsSingleSelectionChecked(): boolean {
    return this.isSingleSelectionChecked;
  }

  public getIsNotSelectionChecked(): boolean {
    return this.isNotSelectionChecked;
  }

  public getIsAndSelection(): boolean {
    return this.isAndSelection;
  }

  public setSearchString(searchString: string) {
    this.searchString = searchString;
    this.searchStringChangeNotifier.next(this.searchString);
  }

  public setSelectedFileGroups(selectedFileGroups: FileGroup[]) {
    this.selectedFileGroups = selectedFileGroups;
  }

  public setIsSingleSelectionChecked(isSingleSelectionChecked: boolean) {
    this.isSingleSelectionChecked = isSingleSelectionChecked;
  }

  public setIsNotSelectionChecked(isNotSelectionChecked: boolean) {
    this.isNotSelectionChecked = isNotSelectionChecked;
  }

  public setIsAndSelection(isAndSelection: boolean) {
    this.isAndSelection = isAndSelection;
  }

  public getSearchStringChangeNotifier(): Observable<string> {
    return this.searchStringChangeNotifier.asObservable();
  }
}
