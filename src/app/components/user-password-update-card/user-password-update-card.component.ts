import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-user-password-update-card',
  templateUrl: './user-password-update-card.component.html',
  styleUrls: ['./user-password-update-card.component.css'],
})
export class UserPasswordUpdateCardComponent implements OnInit {
  @Input() action: (currentPassword: string, newPassword: string) => Promise<void>;

  public passwordUpdateForm: FormGroup;
  public isLoading: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.passwordUpdateForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
        newPassword: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.pattern(validation.passwordRegex)],
        ],
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

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.passwordUpdateForm.invalid) {
      return;
    }

    this.setLoading(true);

    const values = this.passwordUpdateForm.value;
    try {
      await this.action(values.currentPassword, values.newPassword);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.passwordUpdateForm.disable() : this.passwordUpdateForm.enable();
  }
}
