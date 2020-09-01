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
import { Component, Input } from '@angular/core';

import { Layout<<Type>>Commons } from '../layout-<<type>>-commons';
import { <<Type>> } from 'src/app/common/domainobjects/gen/<<Type>>';

@Component({
  selector: 'fileman-<<type>>-list-layout',
  templateUrl: './fileman-<<type>>-list-layout-component.html',
  styleUrls: ['./fileman-<<type>>-list-layout-component.css']
})
export class <<Type>>ListLayout extends Layout<<Type>>Commons {
  getDetailsTooltip(<<type>>: <<Type>>): string {
    return this.get<<Type>>HtmlTooltip(<<type>>);
  }
}
