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
import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FileGroupService } from 'src/app/services/fileman-file-group-service.service';

@Component({
  selector: 'fileman-fileGroup-details',
  templateUrl: './fileman-fileGroup-details.component.html',
  styleUrls: ['./fileman-fileGroup-details.component.css']
})
export class FileGroupDetailsComponent implements OnInit {

  readOnly: boolean;
  currentlyLoggedInUser: any;
  form: FormGroup;
  detailsForm: FormGroup;
  newMode: boolean;
  toEdit: FileGroup;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private fileGroupService: FileGroupService) {
      this.form = this.createFormGroup();
      this.currentlyLoggedInUser = authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.newMode = this.router.url.endsWith('new');
    if ( ! this.newMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const id = this.router.url.substring(index);
      this.fileGroupService.getFileGroup(id).subscribe(fileGroup => {
        this.toEdit = new FileGroup(fileGroup);
        if (this.toEdit == null) {
          alert('No data available for fileGroup "' + id + '"!');
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
    const toSave = new FileGroup({
      id: this.toEdit != null ? this.toEdit.getId() : null,
      name: this.nameC.value.trim()
    });
    console.log('Saving ');
    console.log(toSave);

    if (this.newMode) {
      this.fileGroupService.create(toSave)
          .subscribe(() => {}, error => {
            alert('Error saving new fileGroup with name "' + toSave.getName() + '"!');
          });
    } else {
      this.fileGroupService.update(toSave)
          .subscribe(() => {}, error => {
            alert('Error updating fileGroup with ID "' + toSave.getId() + '"!');
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
    return this.fileGroupService.getAllFileGroups()
        .pipe(map((fileGroupArray: FileGroup[]) => {

      const foundItem = fileGroupArray.find(
        fileGroupItem => fileGroupItem.name === control.value
      );

      if (foundItem) {
        return {isNotUnique: true};
      }

      return null;
    }));
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
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.detailsForm.nameControl');
  }

  private getFileGroup() {
    const fileGroup = new FileGroup(null);

    fileGroup.setName(this.nameC.value);

    return fileGroup;
  }

  private setDataToControls(fileGroup: FileGroup) {
    this.nameC.setValue(fileGroup.getName());
  }
  // The form control block above is generated - do not modify manually!
}
