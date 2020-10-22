import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-password-reset-card',
  templateUrl: './password-reset-card.component.html',
  styleUrls: ['./password-reset-card.component.css'],
})
export class PasswordResetCardComponent implements OnInit {
  @Input() action: (newPassword: string) => Promise<void>;

  public passwordResetForm: FormGroup;
  public isLoading: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.passwordResetForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
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

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.passwordResetForm.invalid) {
      return;
    }

    const password = this.passwordResetForm.value.newPassword;

    this.setLoading(true);

    try {
      await this.action(password);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.passwordResetForm.disable() : this.passwordResetForm.enable();
  }
}
