import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthkeepService } from 'src/app/services/authkeep.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public fpForm: FormGroup;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private conf: ConfigService,
    private alert: SnackbarService,
    private authkeep: AuthkeepService,
  ) {
    const configs = this.conf.get();

    this.fpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(configs.validation.emailRegex)]],
    });
  }

  ngOnInit(): void {}

  async onBtnClick(): Promise<void> {
    if (this.fpForm.invalid) {
      return;
    }

    this.setLoading(true);

    try {
      await this.authkeep.postUserForgotPasswordLink(this.fpForm.value.email);
      this.alert.success('Instructions sent.');
    } catch (err) {
      this.alert.error(err.message);
    }

    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    state ? this.fpForm.disable() : this.fpForm.enable();
    this.isLoading = state;
  }
}
