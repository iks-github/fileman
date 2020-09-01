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
import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';
import { TenantService } from 'src/app/services/fileman-tenant-service.service';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';
import { FilemanSearchService } from 'src/app/services/fileman-search-service.service';
import { FilemanReloadService } from 'src/app/services/fileman-reload-service.service';

@Component({
  selector: 'fileman-tenant-overview',
  templateUrl: './fileman-tenant-overview.component.html',
  styleUrls: ['./fileman-tenant-overview.component.css']
})
export class FilemanTenantOverviewComponent implements OnInit, OnDestroy {
  readonly layoutTypeList: string = Layout.List;
  readonly layoutTypeTable: string = Layout.Table;
  readonly layoutTypeTiles: string = Layout.Tiles;

  userPreferences: UserPreferences;
  userPreferencesSubscription: Subscription;
  searchString: string;
  searchStringSubscription: Subscription;
  reloadRequestSubscription: Subscription;
  tenantDataChangedSubscription: Subscription;
  responseData;
  allTenantsMap = new Map<string, Tenant>();
  viewedTenants = [] as Tenant[];
  readOnly: boolean;
  currentUserName;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private tenantService: TenantService,
              private userPreferencesService: FilemanUserPreferencesService,
              private searchService: FilemanSearchService,
              private reloadService: FilemanReloadService) {
                  console.log('########### overview constr');
              }

  ngOnInit(): void {
    console.log('### tenant overview init')
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
    this.tenantService.getAllTenants()
        .subscribe(responseData => {this.extractTenants(responseData)});
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.reloadRequestSubscription =
      this.reloadService.getReloadRequestNotifier().subscribe(
        () => this.reload()
      );
    this.tenantDataChangedSubscription =
      this.tenantService.getTenantDataChangedNotifier().subscribe(
        () => this.reload()
      );
  }

  isTenantNameUnique(tenantName: string) {
    return this.allTenantsMap.has(tenantName);
  }

  reload() {
    this.allTenantsMap.clear();
    this.tenantService.getAllTenants()
        .subscribe(responseData => {this.extractTenants(responseData)});
  }

  extractTenants(responseData) {
    this.responseData = responseData;
    const tenants = [] as Tenant[];
    this.responseData.forEach(element => {
      const dataset = new Tenant(element);
      tenants.push(dataset);
      this.allTenantsMap.set(dataset.getName(), dataset)
    });
    this.viewedTenants = Utils.sortList(tenants);
    this.searchFor(this.searchString);
  }

  edit(tenant: Tenant) {
    this.router.navigate(['/fileman/details/tenants/' + tenant.getId()]);
  }

  searchFor(searchString: string) {
    this.searchString = searchString;
    const tenantList = [];

    this.allTenantsMap.forEach(tenant => {
      if (tenant.getName().indexOf(searchString) !== -1) {
        tenantList.push(tenant);
      }
    });

    this.viewedTenants = tenantList;
  }

  delete(tenant: Tenant) {
    const ok = confirm('Are you sure to delete "' + tenant.getName() + '"?');
    if (! ok) {return;}
    const toDelete = this.allTenantsMap.get(tenant.getName());
    this.allTenantsMap.delete(tenant.getName());
    const index = this.viewedTenants.indexOf(toDelete);
    this.viewedTenants.splice(index, 1);  // optimistic deletion

    this.tenantService
        .delete(tenant)
        .subscribe(
          deletedTenant => {
              console.log('Successfully deleted tenant: ' + tenant.getName());
            },
          (error: FilemanError) => {
            this.viewedTenants.splice(index, 0, toDelete);  // roll back optimistic deletion
            this.allTenantsMap.set(toDelete.getName(), toDelete);

            if (error instanceof FilemanNotfoundError) {
              // TODO this.form.setErrors(error.cause);
              alert('Tenant does not (more?) exist.')
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
    this.tenantDataChangedSubscription.unsubscribe();
  }
}
