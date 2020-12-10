import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private conf: ConfigService) {
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
}
