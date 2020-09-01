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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FilemanError } from 'src/app/common/errors/fileman-error';
import { FilemanNotfoundError } from 'src/app/common/errors/fileman-not-found-error';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Utils } from 'src/app/common/Utils';
import { Layout, UserRole } from 'src/app/common/fileman-constants';
import { <<Type>> } from 'src/app/common/domainobjects/gen/<<Type>>';
import { <<Type>>Service } from 'src/app/services/fileman-<<type>>-service.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';
import { FilemanSearchService } from 'src/app/services/fileman-search-service.service';
import { FilemanReloadService } from 'src/app/services/fileman-reload-service.service';

@Component({
  selector: 'fileman-<<type>>-overview',
  templateUrl: './fileman-<<type>>-overview.component.html',
  styleUrls: ['./fileman-<<type>>-overview.component.css']
})
export class Fileman<<Type>>OverviewComponent implements OnInit, OnDestroy {
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;

  userPreferences: UserPreferences;
  userPreferencesSubscription: Subscription;
  searchString: string;
  searchStringSubscription: Subscription;
  reloadRequestSubscription: Subscription;
  <<type>>DataChangedSubscription: Subscription;
  responseData;
  all<<Type>>sMap = new Map<string, <<Type>>>();
  viewed<<Type>>s = [] as <<Type>>[];
  readOnly: boolean;
  currentUserName;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private <<type>>Service: <<Type>>Service,
              private userPreferencesService: FilemanUserPreferencesService,
              private searchService: FilemanSearchService,
              private reloadService: FilemanReloadService) {
                  console.log('########### overview constr');
              }

  ngOnInit(): void {
    console.log('### <<type>> overview init')
    this.currentUserName = this.authService.getCurrentUserName();
    this.userPreferences = this.userPreferencesService.getUserPreferences();
    this.userPreferencesSubscription =
      this.userPreferencesService.getUserPreferencesChangeNotifier().subscribe(
        (userPreferences: UserPreferences) => {
          this.userPreferences = userPreferences;
          this.searchFor(this.searchString);
        }
      );
    this.searchString = this.searchService.getSearchString();
    this.searchStringSubscription =
      this.searchService.getSearchStringChangeNotifier().subscribe(
        (searchString: string) => this.searchFor(searchString)
      );
    this.<<type>>Service.getAll<<Type>>s()
        .subscribe(responseData => {this.extract<<Type>>s(responseData)});
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.reloadRequestSubscription =
      this.reloadService.getReloadRequestNotifier().subscribe(
        () => this.reload()
      );
    this.<<type>>DataChangedSubscription =
      this.<<type>>Service.get<<Type>>DataChangedNotifier().subscribe(
        () => this.reload()
      );
  }

  is<<Type>>NameUnique(<<type>>Name: string) {
    return this.all<<Type>>sMap.has(<<type>>Name);
  }

  reload() {
    this.all<<Type>>sMap.clear();
    this.<<type>>Service.getAll<<Type>>s()
        .subscribe(responseData => {this.extract<<Type>>s(responseData)});
  }

  extract<<Type>>s(responseData) {
    this.responseData = responseData;
    const <<type>>s = [] as <<Type>>[];
    this.responseData.forEach(element => {
      const dataset = new <<Type>>(element);
      <<type>>s.push(dataset);
      this.all<<Type>>sMap.set(dataset.getName(), dataset)
    });
    this.viewed<<Type>>s = Utils.sortList(<<type>>s);
    this.searchFor(this.searchString);
  }

  edit(<<type>>: <<Type>>) {
    this.router.navigate(['/fileman/details/<<type>>s/' + <<type>>.getId()]);
  }

  searchFor(searchString: string) {
    this.searchString = searchString;
    const <<type>>List = [];

    this.all<<Type>>sMap.forEach(<<type>> => {
      if (<<type>>.getName().indexOf(searchString) !== -1) {
        <<type>>List.push(<<type>>);
      }
    });

    this.viewed<<Type>>s = <<type>>List;
  }

  delete(<<type>>: <<Type>>) {
    const ok = confirm('Are you sure to delete "' + <<type>>.getName() + '"?');
    if (! ok) {return;}
    const toDelete = this.all<<Type>>sMap.get(<<type>>.getName());
    this.all<<Type>>sMap.delete(<<type>>.getName());
    const index = this.viewed<<Type>>s.indexOf(toDelete);
    this.viewed<<Type>>s.splice(index, 1);  // optimistic deletion

    this.<<type>>Service
        .delete(<<type>>)
        .subscribe(
          deleted<<Type>> => {
              console.log('Successfully deleted <<type>>: ' + <<type>>.getName());
            },
          (error: FilemanError) => {
            this.viewed<<Type>>s.splice(index, 0, toDelete);  // roll back optimistic deletion
            this.all<<Type>>sMap.set(toDelete.getName(), toDelete);

            if (error instanceof FilemanNotfoundError) {
              // TODO this.form.setErrors(error.cause);
              alert('<<Type>> does not (more?) exist.')
            } else {
              throw error;
            }
          }
        );
  }

  ngOnDestroy() {
    this.userPreferencesSubscription.unsubscribe();
    this.searchStringSubscription.unsubscribe();
    this.reloadRequestSubscription.unsubscribe();
    this.<<type>>DataChangedSubscription.unsubscribe();
  }
}
