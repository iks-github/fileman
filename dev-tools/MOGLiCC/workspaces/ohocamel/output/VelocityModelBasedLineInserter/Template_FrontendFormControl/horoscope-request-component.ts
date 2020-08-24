  createFormControl() {
    return new FormGroup({
        nameControl: new FormControl('', [
                Validators.required,
              ]),
        genderControl: new FormControl('d', [
                Validators.required,
              ]),
        birthdayControl: new FormControl('', [
                Validators.required,
              ]),
    });
  }

  get nameC() {
    return this.form.get('nameControl');
  }

  get genderC() {
    return this.form.get('genderControl');
  }

  get birthdayC() {
    return this.form.get('birthdayControl');
  }

  private getHoroscopeRequestData() {
    const horoscopeRequestData = new HoroscopeRequestData(null);

    horoscopeRequestData.setName(this.nameC.value);
    horoscopeRequestData.setGender(this.genderC.value);
    horoscopeRequestData.setBirthday(this.birthdayC.value);

    return horoscopeRequestData;
  }

  private setDataToControls(horoscopeRequestData: HoroscopeRequestData) {
    this.nameC.setValue(horoscopeRequestData.getName());
    this.genderC.setValue(horoscopeRequestData.getGender());
    this.birthdayC.setValue(horoscopeRequestData.getBirthday());
  }