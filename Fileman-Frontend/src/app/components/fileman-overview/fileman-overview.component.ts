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
import { Content, UserRole } from 'src/app/common/fileman-constants';
import { FilemanComponentStateService } from 'src/app/services/fileman-component-state.service';
import { Subscription } from 'rxjs';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';

@Component({
  selector: 'fileman-overview',
  templateUrl: './fileman-overview.component.html',
  styleUrls: ['./fileman-overview.component.css']
})
export class FilemanOverviewComponent implements OnInit, OnDestroy {
  readonly contentTypeFiles: string = Content.Files;
  readonly contentTypeUsers: string = Content.Users;

  contentType: string;
  contentTypeSubscription: Subscription;
  currentUserName: string;

  constructor(private authService: FilemanAuthserviceService,
    private componentStateService: FilemanComponentStateService) {}

  ngOnInit(): void {
    this.currentUserName = this.authService.getCurrentUserName();

    if (this.authService.getCurrentUserRole() === UserRole.Admin) {
      this.contentType = this.componentStateService.getContentType();
      this.contentTypeSubscription =
        this.componentStateService.getContentTypeChangeNotifier().subscribe(
          (contentType: string) => {
            this.contentType = contentType;
          }
        )
    } else {
      this.contentType = Content.Files;
      this.componentStateService.setContentType(this.contentType);
    }
  }

  ngOnDestroy() {
    if (this.contentTypeSubscription != null) {
      this.contentTypeSubscription.unsubscribe();
    }
  }
}
