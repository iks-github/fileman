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

import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FileData } from 'src/app/common/domainobjects/gen/FileData';
import { FileGroup } from 'src/app/common/domainobjects/gen/FileGroup';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FileGroupService } from 'src/app/services/fileman-filegroup-service.service';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { Utils } from 'src/app/common/Utils';
import { UserRole } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-file-details',
  templateUrl: './fileman-filemetadata-details.component.html',
  styleUrls: ['./fileman-filemetadata-details.component.css']
})
export class FilemetadataDetailsComponent implements OnInit {

  readOnly: boolean;
  selectedFileContentSource: any;
  fileContent: any;
  reader: FileReader;
  form: FormGroup;
  detailsForm: FormGroup;
  isFocusOnFileSelector = false;
  currentUser: any;
  fileSelectionFocusGainedCounter = 0;
  newFileMode: boolean;
  techTypeMismatch = false;
  toEdit: FileMetaData;
  fileGroups = [] as FileGroup[];

  fileGroupsMultiselectDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: true,
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    allowSearchFilter: true,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 197,
    itemsShowLimit: 3,
    searchPlaceholderText: 'Search',
    noDataAvailablePlaceholderText: 'No data available',
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false,
    defaultOpen: false
  }

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private fileService: FilemanFileService,
              private metadataService: FilemanMetadataService,
              private fileGroupService: FileGroupService,
              private previewService: FilemanPreviewService) {
      this.form = this.createFormGroup();
      this.reader = new FileReader();
      this.currentUser = authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.newFileMode = this.router.url.endsWith('new');
    if ( ! this.newFileMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const filename = this.router.url.substring(index);
      this.toEdit = this.metadataService.getFileFromCache(filename);
      if (this.toEdit == null) {
        alert('No data available for file "' + filename + '"!');
        this.backToOverview();  // no data to edit avaible - happends for page reload - reason unclear
      } else {
        this.setDataToControls(this.toEdit);
        this.nameC.disable();
      }
    } else {
      this.nameC.enable();
    }
    this.fileGroupService.getAllFileGroups()
        .subscribe(responseData => {this.extractFileGroups(responseData)});
  }

  extractFileGroups(responseData) {
    const fileGroups = [] as FileGroup[];
    responseData.forEach(element => {
      const dataset = new FileGroup(element);
      fileGroups.push(dataset);
    });
    this.fileGroups = Utils.sortList(fileGroups);
  }

  getBorder() {
    if (this.showFileSelectorMandatoryMessage()) {
      return '2px solid red';
    }
    return '';
  }

  getBackgroundColor() {
    return this.newFileMode ? 'lightskyblue' : 'lightgray';
  }

  setFocusOnFileSelector(focusGained: boolean) {
    this.isFocusOnFileSelector = focusGained;
    if (focusGained) {
      this.fileSelectionFocusGainedCounter = this.fileSelectionFocusGainedCounter + 1;
    }
  }

  showFileSelectorMandatoryMessage() {
    return this.newFileMode && ! this.isFocusOnFileSelector && this.fileContentC.value === '' && this.fileSelectionFocusGainedCounter > 1;
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const fileData = this.getFileDataToSave();
    console.log(fileData);

    if (this.newFileMode) {
      this.fileService.create(fileData)
          .subscribe(() => {
            this.previewService.preparePreview(fileData.getMetaData().getName());
          }, error => {
            alert('Error saving new file "' + fileData.getMetaData().getName() + '"!');
          });
    } else {
      this.fileService.update(fileData)
          .subscribe(() => {
            this.previewService.preparePreview(fileData.getMetaData().getName());
          }, error => {
            alert('Error saving updated file "' + fileData.getMetaData().getName() + '"!');
          });
    }

    this.backToOverview();
  }

  private getFileDataToSave() {
    let fileContentData = null;
    const fileMetaData = this.getFileMetaData();
    if (this.newFileMode) {
      fileMetaData.setCreator(this.currentUser);
      fileMetaData.setImmediatelyActive(true);
    }

    if (this.selectedFileContentSource != null) {
      fileMetaData.setSize(this.selectedFileContentSource.size);

      fileContentData = new FileContentData(null);
      fileContentData.setContent(this.fileContent);
      fileContentData.setName(this.nameC.value);
      fileContentData.setCreator(this.currentUser);
      fileContentData.setSize(this.selectedFileContentSource.size);
    }

    const fileData = new FileData(null);
    fileData.setContentData(fileContentData);
    fileData.setMetaData(fileMetaData);

    return fileData;
  }

  onFileContentSourceChange(event) {
    this.selectedFileContentSource = event.srcElement.files[0];

    if (this.selectedFileContentSource == null) {
      return;
    }

    this.reader.readAsBinaryString(this.selectedFileContentSource);
    this.reader.onload = (data) => {
      this.fileContent = btoa(this.reader.result as string);
      console.log(this.fileContent);
    };

    if (this.nameC.value == null || this.nameC.value === '') {
      this.nameC.setValue(this.selectedFileContentSource.name);
      this.nameC.markAsTouched();
    }

    this.checkTechType();
  }

  private checkTechType() {
    if (this.selectedFileContentSource != null && this.toEdit != null) {
      const techType = Utils.getFileExtension(this.selectedFileContentSource.name);
      this.techTypeMismatch = techType !== this.toEdit.getTechType();
      if (this.techTypeMismatch) {
        this.fileContentC.setErrors({invalid: true});
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
    return new FormGroup({inputFieldControl: new FormGroup({
                          detailsForm: this.detailsForm,
                          fileContentControl: new FormControl('')
                    })
           });
  }

  isNotUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.metadataService.getOverviewData()
        .pipe(map((metaDataArray: FileMetaData[]) => {

      const foundItem = metaDataArray.find(
        metaDataItem => metaDataItem.name === control.value
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
                Validators.minLength(3),
                Validators.maxLength(128),
              ],
              this.isNotUnique.bind(this)),
        descriptionControl: new FormControl('', [
                Validators.maxLength(1024),
              ]),
        immediatelyActiveControl: new FormControl('true', [
              ]),
        fileGroupsControl: new FormControl('', [
              ]),
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.detailsForm.nameControl');
  }

  get descriptionC() {
    return this.form.get('inputFieldControl.detailsForm.descriptionControl');
  }

  get immediatelyActiveC() {
    return this.form.get('inputFieldControl.detailsForm.immediatelyActiveControl');
  }

  get fileGroupsC() {
    return this.form.get('inputFieldControl.detailsForm.fileGroupsControl');
  }

  private getFileMetaData() {
    const fileMetaData = new FileMetaData(null);

    fileMetaData.setName(this.nameC.value);
    fileMetaData.setDescription(this.descriptionC.value);
    fileMetaData.setImmediatelyActive(this.immediatelyActiveC.value);
    fileMetaData.setFileGroups(this.fileGroupsC.value);

    return fileMetaData;
  }

  private setDataToControls(fileMetaData: FileMetaData) {
    this.nameC.setValue(fileMetaData.getName());
    this.descriptionC.setValue(fileMetaData.getDescription());
    this.immediatelyActiveC.setValue(fileMetaData.getImmediatelyActive());
    this.fileGroupsC.setValue(fileMetaData.getFileGroups());
  }
  // The form control block above is generated - do not modify manually!


  get fileContentC() {
    return this.form.get('inputFieldControl.fileContentControl');
  }

}
