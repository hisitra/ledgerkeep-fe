import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public fpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private conf: ConfigService) {
    const configs = this.conf.get();

    this.fpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(configs.validation.emailRegex)]],
    });
  }

  ngOnInit(): void {}
}
