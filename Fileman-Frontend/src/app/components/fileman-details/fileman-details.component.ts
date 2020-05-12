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
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FileData } from 'src/app/common/domainobjects/gen/FileData';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';
import { FilemanOverviewComponent } from '../fileman-overview/fileman-overview.component';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'fileman-details',
  templateUrl: './fileman-details.component.html',
  styleUrls: ['./fileman-details.component.css']
})
export class FilemanDetailsComponent implements OnInit {

  readOnly: boolean;
  selectedFileContentSource;
  fileContent;
  reader: FileReader;
  form: FormGroup;
  metaDataForm: FormGroup;
  isFocusOnFileSelector = false;
  currentUser;
  fileSelectionFocusGainedCounter = 0;
  newFileMode: boolean;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private fileService: FilemanFileService,
              private overview: FilemanOverviewComponent,
              private metadataService: FilemanMetadataService) {
      this.form = this.createFormGroup();
      this.reader = new FileReader();
      this.currentUser = authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.newFileMode = this.router.url.endsWith('new');
    if ( ! this.newFileMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const filename = this.router.url.substring(index);
      const toEdit = this.overview.getFile(filename);
      if (toEdit == null) {
        this.backToOverview();  // no data to edit avaible - happends for page reload - reason unclear
      } else {
        this.setDataToControls(toEdit);
        this.nameC.disable();
      }
    } else {
      this.nameC.enable();
    }
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
    this.overview.addFile(fileData.getMetaData()); // optimistic update

    if (this.newFileMode)
    {
      this.fileService.create(fileData)
          .subscribe(() => {}, error => {
            this.overview.removeFile(fileData.getMetaData()); // rollback optimistic update
            alert('Error saving new file "' + fileData.getMetaData().getName() + '"!');
          });
    }
    else
    {
      this.fileService.update(fileData)
          .subscribe(() => {}, error => {
            this.overview.removeFile(fileData.getMetaData()); // rollback optimistic update
            alert('Error saving new file "' + fileData.getMetaData().getName() + '"!');
          });

    }

    this.backToOverview();
  }

  private getFileDataToSave() {
    let fileContentData = null;
    const fileMetaData = this.getFileMetaData();
    if (this.newFileMode) { fileMetaData.setCreator(this.currentUser); }

    if (this.selectedFileContentSource != null) {
      fileMetaData.setSize(this.selectedFileContentSource.size);

      fileContentData = new FileContentData(null);
      fileContentData.setContent(this.fileContent);
      fileContentData.setName(this.nameC.value);
      fileContentData.setCreator(this.currentUser);
    }


    const fileData = new FileData(null);
    fileData.setContentData(fileContentData);
    fileData.setMetaData(fileMetaData);

    return fileData;
  }


  onFileContentSourceChange(event) {
    this.selectedFileContentSource = event.srcElement.files[0];
    this.reader.readAsBinaryString(this.selectedFileContentSource);
    this.reader.onload = (data) => {
      this.fileContent = btoa(this.reader.result as string);
      console.log(this.fileContent);
    };

    if (this.nameC.value == null || this.nameC.value === '') {
      this.nameC.setValue(this.selectedFileContentSource.name);
      this.nameC.markAsTouched();
    }
  }

  backToOverview() {
    this.router.navigate(['/overview']);
  }

  cancel() {
    this.backToOverview();
  }

  get fileContentC() {
    return this.form.get('inputFieldControl.fileContentControl');
  }

  createFormGroup() {
    this.metaDataForm = this.createMetaDataFormControl();
    return new FormGroup({inputFieldControl: new FormGroup({
                          metaDataForm: this.metaDataForm,
                          fileContentControl: new FormControl('')
                    })
           });
  }

  isNotUnique(control: AbstractControl): Observable<ValidationErrors | null> {

    return this.metadataService.getOverviewData()
        .pipe(map((metaDataArray: FileMetaData[]) => {

      var foundItem = metaDataArray.find(
        metaDataItem => metaDataItem.name === control.value
      );

      if (foundItem) {
        return {isNotUnique: true};
      }

      return null;
    }));
  }

  // The form control block below is generated - do not modify manually!
  createMetaDataFormControl() {
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
        typeControl: new FormControl('Text', [
              ]),
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.metaDataForm.nameControl');
  }

  get descriptionC() {
    return this.form.get('inputFieldControl.metaDataForm.descriptionControl');
  }

  get immediatelyActiveC() {
    return this.form.get('inputFieldControl.metaDataForm.immediatelyActiveControl');
  }

  get typeC() {
    return this.form.get('inputFieldControl.metaDataForm.typeControl');
  }

  private getFileMetaData() {
    const fileMetaData = new FileMetaData(null);

    fileMetaData.setName(this.nameC.value);
    fileMetaData.setDescription(this.descriptionC.value);
    fileMetaData.setImmediatelyActive(this.immediatelyActiveC.value);
    fileMetaData.setType(this.typeC.value);

    return fileMetaData;
  }

  private setDataToControls(metadata: FileMetaData) {
    this.nameC.setValue(metadata.getName());
    this.descriptionC.setValue(metadata.getDescription());
    this.immediatelyActiveC.setValue(metadata.getImmediatelyActive());
    this.typeC.setValue(metadata.getType());
  }
  // The form control block above is generated - do not modify manually!
}
