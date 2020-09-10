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
import { Component } from '@angular/core';

import { LayoutTenantCommons } from '../layout-tenant-commons';
import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';

@Component({
  selector: 'fileman-tenant-list-layout',
  templateUrl: './fileman-tenant-list-layout-component.html',
  styleUrls: ['./fileman-tenant-list-layout-component.css']
})
export class TenantListLayout extends LayoutTenantCommons {
  getDetailsTooltip(tenant: Tenant): string {
    return this.getTenantHtmlTooltip(tenant);
  }
}
