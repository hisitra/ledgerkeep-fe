import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { AuthkeepService } from 'src/app/services/authkeep.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isMasterLoading = false;
  public isGeneralUpdateLoading = false;
  public isPasswordUpdateLoading = false;

  public imageSource: string;
  public user: any = {};

  public generalUpdateForm: FormGroup;
  public passwordUpdateForm: FormGroup;

  constructor(
    private conf: ConfigService,
    private authkeep: AuthkeepService,
    private auth: AuthService,
    private alert: SnackbarService,
    private formBuilder: FormBuilder,
  ) {
    const configs = this.conf.get();
    this.imageSource = `${configs.api.imagekeep}/api/generalAccess/cover/random.jpg?width=800`;

    this.generalUpdateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(configs.validation.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(configs.validation.nameRegex)]],
    });

    this.passwordUpdateForm = this.formBuilder.group(
      {
        currentPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(configs.validation.passwordMinLength),
            Validators.pattern(configs.validation.passwordRegex),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(configs.validation.passwordMinLength),
            Validators.pattern(configs.validation.passwordRegex),
          ],
        ],
        confirmNewPassword: [''],
      },
      {
        validators: (formGroup: FormGroup) => {
          const newPassword = formGroup.controls.newPassword;
          const confirmNewPassword = formGroup.controls.confirmNewPassword;

          if (newPassword.value !== confirmNewPassword.value) {
            confirmNewPassword.setErrors({ unmatch: true });
          } else {
            confirmNewPassword.setErrors(null);
          }
        },
      },
    );
  }

  async ngOnInit(): Promise<void> {
    this.isMasterLoading = true;

    const promises = [this.loadUser()];

    try {
      await Promise.all(promises);
    } catch (err) {}

    this.generalUpdateForm.get('firstName').setValue(this.user.firstName);
    this.generalUpdateForm.get('lastName').setValue(this.user.lastName);

    this.isMasterLoading = false;
  }

  public async onGeneralUpdateClick(): Promise<void> {
    if (this.generalUpdateForm.invalid) {
      return;
    }

    this.setGeneralUpdateLoading(true);

    try {
      await this.authkeep.patchUser(this.generalUpdateForm.value);
      this.alert.success('Profile updated.');

      Object.keys(this.generalUpdateForm.value).forEach((key) => {
        this.user[key] = this.generalUpdateForm.value[key];
      });
    } catch (err) {
      this.alert.error(err.message);
    }

    this.setGeneralUpdateLoading(false);
  }

  public async onPasswordUpdateClick(): Promise<void> {
    if (this.passwordUpdateForm.invalid) {
      return;
    }

    this.setPasswordUpdateLoading(true);

    const formValue = this.passwordUpdateForm.value;
    try {
      await this.authkeep.patchUserPassword(formValue.currentPassword, formValue.newPassword);

      this.alert.success('Password updated.');
    } catch (err) {
      this.alert.error(err.message);
    }

    this.passwordUpdateForm.reset();
    this.setPasswordUpdateLoading(false);
  }

  private async loadUser(): Promise<void> {
    try {
      const { data } = await this.authkeep.getUser();
      this.user = data;
    } catch (err) {
      this.alert.error(err.message);
    }
  }

  private setGeneralUpdateLoading(state: boolean): void {
    state ? this.generalUpdateForm.disable() : this.generalUpdateForm.enable();
    this.isGeneralUpdateLoading = state;
  }

  private setPasswordUpdateLoading(state: boolean): void {
    state ? this.passwordUpdateForm.disable() : this.passwordUpdateForm.enable();
    this.isPasswordUpdateLoading = state;
  }
}
