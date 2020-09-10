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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Content } from 'src/app/common/fileman-constants';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';

@Component({
  selector: 'fileman-overview',
  templateUrl: './fileman-overview.component.html',
  styleUrls: ['./fileman-overview.component.css']
})
export class FilemanOverviewComponent implements OnInit, OnDestroy {
  readonly contentTypeFiles: string = Content.Files;
  readonly contentTypeUsers: string = Content.Users;
  readonly contentTypeTenants: string = Content.Tenants;
  readonly contentTypeFileGroups: string = Content.FileGroups;

  contentType: string;
  userPreferencesSubscription: Subscription;
  currentUserName: string;

  constructor(private authService: FilemanAuthserviceService,
    private userPreferencesService: FilemanUserPreferencesService) {}

  ngOnInit(): void {
    this.currentUserName = this.authService.getCurrentUserName();
    this.contentType = this.userPreferencesService.getContentType();
    this.userPreferencesSubscription =
      this.userPreferencesService.getUserPreferencesChangeNotifier().subscribe(
        (userPreferences: UserPreferences) => {
          this.contentType = userPreferences.contentType;
        }
      );
  }

  ngOnDestroy() {
    if (this.userPreferencesSubscription != null) {
      this.userPreferencesSubscription.unsubscribe();
    }
  }
}
