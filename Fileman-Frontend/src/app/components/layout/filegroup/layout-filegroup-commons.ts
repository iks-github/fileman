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
import { Input, Output, EventEmitter } from '@angular/core';

import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';
import { LayoutCommons } from '../layout-commons';

export class LayoutFileGroupCommons extends LayoutCommons {
  @Input() viewedFileGroups;
  @Input() readOnly;
  @Output() fileGroupEdited: EventEmitter<FileGroup> = new EventEmitter<FileGroup>();
  @Output() fileGroupDeleted: EventEmitter<FileGroup> = new EventEmitter<FileGroup>();

  edit(fileGroup: FileGroup) {
    this.fileGroupEdited.emit(fileGroup);
  }

  delete(fileGroup: FileGroup) {
    this.fileGroupDeleted.emit(fileGroup);
  }

  getFileGroupHtmlTooltip(fileGroup: FileGroup): string {
    return '<div class="inner-html-enclosing-div"><h4>Details:</h4>' +
      '<hr>' +
      this.buildHtmlTooltipContentRow('Name', fileGroup.name)+'</div>'
  }
}
