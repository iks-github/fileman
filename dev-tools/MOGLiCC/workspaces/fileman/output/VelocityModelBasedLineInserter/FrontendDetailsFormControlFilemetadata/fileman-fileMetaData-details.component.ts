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

  private getFileMetaData() {
    const fileMetaData = new FileMetaData(null);

    fileMetaData.setName(this.nameC.value);
    fileMetaData.setDescription(this.descriptionC.value);
    fileMetaData.setImmediatelyActive(this.immediatelyActiveC.value);

    return fileMetaData;
  }

  private setDataToControls(fileMetaData: FileMetaData) {
    this.nameC.setValue(fileMetaData.getName());
    this.descriptionC.setValue(fileMetaData.getDescription());
    this.immediatelyActiveC.setValue(fileMetaData.getImmediatelyActive());
  }