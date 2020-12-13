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
  public isLoading = false;
  public imageSource: string;
  public user: any = {};
  public generalUpdateForm: FormGroup;

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
  }

  async ngOnInit(): Promise<void> {
    this.setLoading(true);

    const promises = [this.loadUser()];

    try {
      await Promise.all(promises);
    } catch (err) {}

    this.generalUpdateForm.get('firstName').setValue(this.user.firstName);
    this.generalUpdateForm.get('lastName').setValue(this.user.lastName);

    this.setLoading(false);
  }

  private async loadUser(): Promise<void> {
    try {
      const { data } = await this.authkeep.getUser(this.auth.getToken());
      this.user = data;
    } catch (err) {
      this.alert.error(err.message);
    }
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
  }
}
