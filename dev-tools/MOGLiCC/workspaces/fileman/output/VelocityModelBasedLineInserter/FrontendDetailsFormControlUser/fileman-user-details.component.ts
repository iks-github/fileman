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
                Validators.maxLength(60),
                this.requiredForNewUser.bind(this),
              ]),
        passwordRepetitionControl: new FormControl('', [
                Validators.minLength(1),
                Validators.maxLength(60),
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