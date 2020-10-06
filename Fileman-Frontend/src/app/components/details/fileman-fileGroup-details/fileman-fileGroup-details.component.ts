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
import { FileGroupService } from 'src/app/services/fileman-filegroup-service.service';
import { MultiselectDropdownSettings } from 'src/app/common/fileman-constants';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { Utils } from 'src/app/common/Utils';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';

@Component({
  selector: 'fileman-filegroup-details',
  templateUrl: './fileman-filegroup-details.component.html',
  styleUrls: ['./fileman-filegroup-details.component.css']
})
export class FileGroupDetailsComponent implements OnInit {

  readOnly: boolean;
  currentlyLoggedInUser: any;
  form: FormGroup;
  detailsForm: FormGroup;
  newMode: boolean;
  toEdit: FileGroup;
  files = [] as FileMetaData[];
  filesMultiselectDropdownSettings = MultiselectDropdownSettings;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private fileGroupService: FileGroupService,
              private metadataService: FilemanMetadataService) {
      this.form = this.createFormGroup();
      this.currentlyLoggedInUser = authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.newMode = this.router.url.endsWith('new');
    if ( ! this.newMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const id = this.router.url.substring(index);
      const files = [] as FileMetaData[];
      this.fileGroupService.getFileGroup(id).subscribe(fileGroup => {
        this.toEdit = new FileGroup(fileGroup);
        if (this.toEdit == null) {
          alert('No data available for file group "' + id + '"!');
          this.backToOverview();  // no data to edit available - happens for page reload - reason unclear
        } else {
          this.setDataToControls(this.toEdit);
          this.metadataService.getOverviewData()
              .subscribe(responseData => {this.extractFiles(responseData);
          });
        }
      });
    } else {
      this.metadataService.reloadOverviewData()
          .subscribe(responseData => {this.extractFiles(responseData)});
    }
  }

  extractFiles(responseData) {
    const files = [] as FileMetaData[];
    responseData.forEach(element => {
      const dataset = new FileMetaData(element);
      files.push(dataset);
    });
    this.files = Utils.sortList(files);
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const toSave = new FileGroup({
      id: this.toEdit != null ? this.toEdit.getId() : null,
      name: this.nameC.value.trim(),
      files: this.filesC.value
    });
    console.log('Saving ');
    console.log(toSave);

    if (this.newMode) {
      this.fileGroupService.create(toSave)
          .subscribe(() => {}, error => {
            alert('Error saving new file group with name "' + toSave.getName() + '"!');
          });
    } else {
      this.fileGroupService.update(toSave)
          .subscribe(() => {}, error => {
            alert('Error updating file group with ID "' + toSave.getId() + '"!');
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
        filesControl: new FormControl('', [
              ]),
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.detailsForm.nameControl');
  }

  get filesC() {
    return this.form.get('inputFieldControl.detailsForm.filesControl');
  }

  private getFileGroup() {
    const fileGroup = new FileGroup(null);

    fileGroup.setName(this.nameC.value);
    fileGroup.setFiles(this.filesC.value);

    return fileGroup;
  }

  private setDataToControls(fileGroup: FileGroup) {
    this.nameC.setValue(fileGroup.getName());
    this.filesC.setValue(fileGroup.getFiles());
  }
  // The form control block above is generated - do not modify manually!
}
