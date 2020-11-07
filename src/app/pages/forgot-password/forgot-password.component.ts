import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private alertService: AlertService, private backend: BackendService) {}

  ngOnInit() {}

  async onSubmit(email: string): Promise<void> {
    try {
      await this.backend.initPasswordReset(email);
      this.alertService.success('Instructions sent to this mail.', true);
    } catch (err) {
      this.alertService.error(err.message);
    }
  }
}
