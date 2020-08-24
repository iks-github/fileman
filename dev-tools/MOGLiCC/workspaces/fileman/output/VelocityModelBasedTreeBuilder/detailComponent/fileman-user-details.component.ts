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
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/domainobjects/gen/User';
import { FilemanLoginService } from 'src/app/services/fileman-login.service';
import { UserService } from 'src/app/services/fileman-user-service.service';

@Component({
  selector: 'fileman-user-details',
  templateUrl: './fileman-user-details.component.html',
  styleUrls: ['./fileman-user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  readOnly: boolean;
  currentlyLoggedInUser: any;
  form: FormGroup;
  detailsForm: FormGroup;
  newMode: boolean;
  toEdit: User;

  constructor(private router: Router,
              private loginService: FilemanLoginService,
              private userService: UserService) {
      this.form = this.createFormGroup();
      this.currentlyLoggedInUser = loginService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.loginService.getCurrentUserRole() === 'Reader';
    this.newMode = this.router.url.endsWith('new');
    if ( ! this.newMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const id = this.router.url.substring(index);
      this.userService.getUser(id).subscribe(user => {
        this.toEdit = new User(user);
        if (this.toEdit == null) {
          alert('No data available for user "' + id + '"!');
          this.backToOverview();  // no data to edit available - happens for page reload - reason unclear
        } else {
          this.setDataToControls(this.toEdit);
        }
      });
    }
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const toSave = this.form.value as User;
    console.log('Saving ');
    console.log(toSave);

    if (this.newMode) {
      this.userService.create(toSave)
          .subscribe(() => {}, error => {
            alert('Error saving new user with name "' + toSave.getName() + '"!');
          });
    } else {
      this.userService.update(toSave)
          .subscribe(() => {}, error => {
            alert('Error updating user with ID "' + toSave.getId() + '"!');
          });
    }

    this.backToOverview();
  }

  backToOverview() {
    this.router.navigate(['/fileman/overview']);
  }

  cancel() {
    this.backToOverview();
  }

  createFormGroup() {
    this.detailsForm = this.createDetailsFormGroup();
    return new FormGroup({
      inputFieldControl: new FormGroup({
        detailsForm: this.detailsForm
      })
    });
  }

  isNotUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.getAllUsers()
        .pipe(map((userArray: User[]) => {

      const foundItem = userArray.find(
        userItem => userItem.name === control.value
      );

      if (foundItem) {
        return {isNotUnique: true};
      }

      return null;
    }));
  }

  // The form control block below is generated - do not modify manually!
  // The form control block above is generated - do not modify manually!
}