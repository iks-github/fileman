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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Content, Layout } from '../common/fileman-constants';

@Injectable({
  providedIn: 'root'
})
export class FilemanComponentStateService {

  private contentType: string = Content.Files;
  private contentTypeChangeNotifier: Subject<string> = new Subject<string>();

  private layoutType: string = Layout.List;
  private layoutTypeChangeNotifier: Subject<string> = new Subject<string>();

  private searchString: string = '';
  private searchStringChangeNotifier: Subject<string> = new Subject<string>();

  private favouriteFilterActive: boolean;
  private favouriteFilterActiveChangeNotifier: Subject<boolean> = new Subject<boolean>();

  private reloadRequestNotifier: Subject<void> = new Subject<void>();

  public getContentType(): string {
    return this.contentType;
  }

  public setContentType(overviewType: string) {
    this.contentType = overviewType;
    this.contentTypeChangeNotifier.next(this.contentType);
  }

  public getContentTypeChangeNotifier(): Subject<string> {
    return this.contentTypeChangeNotifier;
  }

  public getLayoutType(): string {
    return this.layoutType;
  }

  public setLayoutType(layoutType: string) {
    this.layoutType = layoutType;
    this.layoutTypeChangeNotifier.next(this.layoutType);
  }

  public getLayoutTypeChangeNotifier(): Subject<string> {
    return this.layoutTypeChangeNotifier;
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

  public getFavouriteFilterActive(): boolean {
    return this.favouriteFilterActive;
  }

  public setFavouriteFilterActive(favouriteFilterActive: boolean) {
    this.favouriteFilterActive = favouriteFilterActive;
    this.favouriteFilterActiveChangeNotifier.next(this.favouriteFilterActive);
  }

  public getFavouriteFilterActiveChangeNotifier(): Subject<boolean> {
    return this.favouriteFilterActiveChangeNotifier;
  }

  public requestReload() {
    return this.reloadRequestNotifier.next();
  }

  public getReloadRequestNotifier(): Subject<void> {
    return this.reloadRequestNotifier;
  }
}
