import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthkeepService } from 'src/app/services/authkeep.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public isLoading = false;
  public signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private conf: ConfigService,
    private alert: SnackbarService,
    private alertDialog: AlertDialogService,
    private authkeep: AuthkeepService,
    private router: Router,
  ) {
    const configs = this.conf.get();

    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern(configs.validation.nameRegex)]],
        lastName: ['', [Validators.required, Validators.pattern(configs.validation.nameRegex)]],
        email: ['', [Validators.required, Validators.pattern(configs.validation.emailRegex)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(configs.validation.passwordMinLength),
            Validators.pattern(configs.validation.passwordRegex),
          ],
        ],
        confirmPassword: [''],
      },
      {
        validators: (formGroup: FormGroup) => {
          const password = formGroup.controls.password;
          const confirmPassword = formGroup.controls.confirmPassword;

          if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ unmatch: true });
          } else {
            confirmPassword.setErrors(null);
          }
        },
      },
    );
  }

  ngOnInit(): void {}

  async onBtnAction(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }

    this.setLoading(true);

    const formValue = this.signupForm.value;
    const signupData = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
    };

    try {
      await this.authkeep.postUserSignupLink(signupData);
      this.alertDialog.success('Check your mail to complete signup.');
      this.signupForm.reset();
    } catch (err) {
      this.alert.error(err.message);
    }

    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    state ? this.signupForm.disable() : this.signupForm.enable();
    this.isLoading = state;
  }
}
