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
import { Icon } from 'src/app/common/fileman-constants';
import { <<Type>> } from 'src/app/common/domainobjects/gen/<<Type>>';
import { LayoutCommons } from '../layout-commons';

export class Layout<<Type>>Commons extends LayoutCommons {
	
  edit(item: <<Type>>) {
    //this.itemEdited.emit(item);
  }

  delete(item: <<Type>>) {
    //this.itemDeleted.emit(item);
  }
	
}

