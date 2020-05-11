  createMetaDataFormControl() {
    return new FormGroup({
        nameControl: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(128),
              ],
              FilemanValidators.isNotUnique),
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