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

import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';
import { LayoutCommons } from '../layout-commons';

export class LayoutTenantCommons extends LayoutCommons {
  @Input() viewedTenants;
  @Input() readOnly;
  @Output() tenantEdited: EventEmitter<Tenant> = new EventEmitter<Tenant>();
  @Output() tenantDeleted: EventEmitter<Tenant> = new EventEmitter<Tenant>();
	
  edit(tenant: Tenant) {
    this.tenantEdited.emit(tenant);
  }

  delete(tenant: Tenant) {
    this.tenantDeleted.emit(tenant);
  }

  getTenantHtmlTooltip(tenant: Tenant): string {
    return '<div class="inner-html-enclosing-div"><h4>Details:</h4>' +
      '<hr>' +
      this.buildHtmlTooltipContentRow('Name', tenant.name) +
      this.buildHtmlTooltipContentRow('Role', tenant.role)+'</div>'
  }
}