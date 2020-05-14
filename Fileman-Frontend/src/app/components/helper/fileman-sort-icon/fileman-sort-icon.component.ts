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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilemanConstants, SortType } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-sorticon',
  templateUrl: './fileman-sort-icon.component.html',
  styleUrls: ['./fileman-sort-icon.component.css']
})
export class FilemanSortIconComponent implements OnInit {

  @Input() sortField: string;
  @Output() sortEventHandler = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sort(ascending: boolean) {
    const event = {sortField: this.sortField, sortType: SortType.ASC};
    if (! ascending) {
      event.sortType = SortType.DESC;
    }
    this.sortEventHandler.emit(event);
  }

}