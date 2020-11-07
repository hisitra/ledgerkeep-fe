import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.css'],
})
export class SignupCardComponent implements OnInit {
  @Input() action: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<boolean>;

  public signupForm: FormGroup;
  public isLoading: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern(validation.nameRegex)]],
        lastName: ['', [Validators.required, Validators.pattern(validation.nameRegex)]],
        email: ['', [Validators.required, Validators.pattern(validation.emailRegex)]],
        password: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
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

  ngOnInit() {}

  async onFormSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, firstName, lastName, password } = this.signupForm.value;

    this.setLoading(true);

    try {
      const success = await this.action(email, firstName, lastName, password);
      if (success) {
        this.signupForm.reset();
      }
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.signupForm.disable() : this.signupForm.enable();
  }
}
