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
import { FilemanAvatarService } from 'src/app/services/fileman-avatar-service.service';

@Component({
  selector: 'fileman-user-details',
  templateUrl: './fileman-user-details.component.html',
  styleUrls: ['./fileman-user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  readOnly: boolean;
  currentlyLoggedInUser: any;
  isFocusOnFileSelector = false;
  fileSelectionFocusGainedCounter = 0;
  selectedFileContentSource: any;
  avatarFileContent: any;
  reader: FileReader;
  form: FormGroup;
  detailsForm: FormGroup;
  newMode: boolean;
  toEdit: User;

  constructor(private router: Router,
              private loginService: FilemanLoginService,
              private userService: UserService,
              private avatarService: FilemanAvatarService) {
      this.form = this.createFormGroup();
      this.reader = new FileReader();
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

  getBorder() {
    if (this.avatarC.hasError('wrongContentType')) {
      return '2px solid red';
    }
    return '';
  }

  setFocusOnFileSelector(focusGained: boolean) {
    this.isFocusOnFileSelector = focusGained;
    if (focusGained) {
      this.fileSelectionFocusGainedCounter = this.fileSelectionFocusGainedCounter + 1;
    }
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const toSave = new User({
      id: this.toEdit != null ? this.toEdit.getId() : null,
      name: this.nameC.value.trim(),
      role: this.roleC.value,
      password: this.passwordC.value != null
                  && this.passwordC.value.trim().length > 0 ?
                  this.passwordC.value.trim() : null,
      passwordRepetition: this.passwordRepetitionC.value != null
                  && this.passwordRepetitionC.value.trim().length > 0 ?
                  this.passwordRepetitionC.value.trim() : null,
      avatar: this.avatarFileContent
    });
    console.log('Saving ');
    console.log(toSave);

    if (this.newMode) {
      this.userService.create(toSave)
          .subscribe(() => {
            this.avatarService.prepareAvatar(toSave);
          }, error => {
            alert('Error saving new user with name "' + toSave.getName() + '"!');
          });
    } else {
      this.userService.update(toSave)
          .subscribe(() => {
            this.avatarService.prepareAvatar(toSave);
          }, error => {
            alert('Error updating user with ID "' + toSave.getId() + '"!');
          });
    }

    this.backToOverview();
  }

  onAvatarChange(event) {
    this.selectedFileContentSource = event.srcElement.files[0];

    if (this.selectedFileContentSource == null) {
      return;
    }

    this.reader.readAsBinaryString(this.selectedFileContentSource);
    this.reader.onload = (data) => {
      this.avatarFileContent = btoa(this.reader.result as string);
      console.log(this.avatarFileContent);
      this.checkAllowedContentType();
    };
  }

  private checkAllowedContentType() {
    if (this.avatarFileContent != null && this.toEdit != null) {
      const allowedContentType: boolean =
        this.avatarService.checkAllowedContentType(this.avatarFileContent);

      if (!allowedContentType) {
        this.avatarC.setErrors({wrongContentType: true});
      }
    }
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
          && !(this.toEdit != null && userItem.name === this.toEdit.name)
      );

      if (foundItem) {
        return {isNotUnique: true};
      }

      return null;
    }));
  }

  requiredForNewUser(control: FormControl) {
    if (!this.newMode || (control.value != null && control.value.length > 0)) {
      return null;
    }

    return {noPasswordGivenForNewUser: true};
  }

  applyCrossFieldValidation(group: FormGroup) {

    let password = group.controls['passwordControl'].value;
    if (password == null) {
      password = '';
    }

    let passwordRepetition = group.controls['passwordRepetitionControl'].value;
    if (passwordRepetition == null) {
      passwordRepetition = '';
    }

    if (password.trim() === passwordRepetition.trim()) {
      return null;
    }

    return {passwordFieldsDontMatch: true};
  }

  // The form control block below is generated - do not modify manually!
  createDetailsFormGroup() {
    return new FormGroup({
        nameControl: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(64),
              ],
              this.isNotUnique.bind(this)),
        roleControl: new FormControl('', [
                Validators.required,
              ]),
        passwordControl: new FormControl('', [
                Validators.minLength(1),
                Validators.maxLength(32),
                this.requiredForNewUser.bind(this),
              ]),
        passwordRepetitionControl: new FormControl('', [
                Validators.minLength(1),
                Validators.maxLength(32),
              ]),
        avatarControl: new FormControl('', [
              ]),
    }, this.applyCrossFieldValidation.bind(this));
  }

  get nameC() {
    return this.form.get('inputFieldControl.detailsForm.nameControl');
  }

  get roleC() {
    return this.form.get('inputFieldControl.detailsForm.roleControl');
  }

  get passwordC() {
    return this.form.get('inputFieldControl.detailsForm.passwordControl');
  }

  get passwordRepetitionC() {
    return this.form.get('inputFieldControl.detailsForm.passwordRepetitionControl');
  }

  get avatarC() {
    return this.form.get('inputFieldControl.detailsForm.avatarControl');
  }

  private getUser() {
    const user = new User(null);

    user.setName(this.nameC.value);
    user.setRole(this.roleC.value);
    user.setPassword(this.passwordC.value);
    user.setPasswordRepetition(this.passwordRepetitionC.value);
    user.setAvatar(this.avatarC.value);

    return user;
  }

  private setDataToControls(user: User) {
    this.nameC.setValue(user.getName());
    this.roleC.setValue(user.getRole());
    this.passwordC.setValue(user.getPassword());
    this.passwordRepetitionC.setValue(user.getPasswordRepetition());
  }
  // The form control block above is generated - do not modify manually!
}
