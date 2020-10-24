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

import { User } from 'src/app/common/domainobjects/gen/User';
import { LayoutCommons } from '../layout-commons';
import { FilemanAvatarService } from 'src/app/services/fileman-avatar-service.service';
import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';

export class LayoutUserCommons extends LayoutCommons {
  @Input() viewedUsers;
  @Input() readOnly;
  @Output() userEdited: EventEmitter<User> = new EventEmitter<User>();
  @Output() userDeleted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private avatarService: FilemanAvatarService) {
    super();
  }

  edit(user: User) {
    this.userEdited.emit(user);
  }

  delete(user: User) {
    this.userDeleted.emit(user);
  }

  getUserHtmlTooltip(user: User): string {
    return '<div class="inner-html-enclosing-div"><b>Details:</b>' +
      '<hr>' +
      this.buildHtmlTooltipContentRow('Name', user.name) +
      this.buildHtmlTooltipContentRow('Role', user.role) +
      this.buildHtmlTooltipContentRow('Tenants',
          this.formatTenants(user.tenants)) + '</div>';
  }

  formatTenants(tenants: Tenant[]): string {
    let tenantString: string = '';

    tenants.forEach((tenant: Tenant) => {
      if (tenantString.length > 0) {
        tenantString += ', ';
      }
      tenantString += tenant.name;
    });

    return tenantString;
  }

  hasAvatar(userName: string): boolean {
    return this.avatarService.hasAvatar(userName);
  }

  getAvatar(userName: string): string {
    return this.avatarService.getAvatarData(userName);
  }

  getUserInitials(userName: string): string {
    return userName.split(' ')
                   .map(namePart => namePart[0])
                   .join('')
                   .substr(0, 3);
  }

  getCharCodeForUserName(userInitials: string): number {
    return parseInt(userInitials.split('')
                                .map(char => char.charCodeAt(0))
                                .join(''));
  }

  getAvatarBackgroundColor(userName: string): string {
    const colors = ['#5A9BD5', '#EE7F30', '#538234', 'lightsalmon',
                    '#012456', '#951629', '#5C60E3', 'gold', 'darkkhaki'];
    const charCode = this.getCharCodeForUserName(userName);
    return colors[charCode % colors.length];
  }

  getAvatarTextColor(userName: string): string {
    const colors = ['white', 'black', '#FDE494', 'black',
                    'white', '#DFA129', '#FFFF60', 'darkblue', 'black'];
    const charCode = this.getCharCodeForUserName(userName);
    return colors[charCode % colors.length];
  }
}
