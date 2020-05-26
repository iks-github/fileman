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

import { Layout } from '../common/fileman-constants';

@Injectable({
  providedIn: 'root'
})
export class FilemanComponentStateService {

  private overviewLayoutType: string = Layout.List;
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
