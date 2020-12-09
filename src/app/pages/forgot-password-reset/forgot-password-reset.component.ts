import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.scss'],
})
export class ForgotPasswordResetComponent implements OnInit {
  private forgotPasswordID: string;

  public prForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private alert: SnackbarService,
    private router: Router,
    private formBuilder: FormBuilder,
    private conf: ConfigService,
  ) {
    const configs = this.conf.get();

    this.prForm = this.formBuilder.group(
      {
        newPassword: [
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
          const newPassword = formGroup.controls.newPassword;
          const confirmPassword = formGroup.controls.confirmPassword;

          if (newPassword.value !== confirmPassword.value) {
            confirmPassword.setErrors({ unmatch: true });
          } else {
            confirmPassword.setErrors(null);
          }
        },
      },
    );
  }

  async ngOnInit(): Promise<void> {
    try {
      this.forgotPasswordID = await this.getForgotPasswordID();

      if (!this.forgotPasswordID) {
        throw new Error('');
      }
    } catch (err) {
      this.alert.error('Invalid link. Redirecting...');
      this.router.navigate(['/landing']);
    }
  }

  private async getForgotPasswordID(): Promise<string> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => {
        resolve(params.forgotPasswordID);
      });
    });
  }
}
