import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private backend: BackendService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onSubmit(newPassword: string): Promise<void> {
    const passwordResetID = await this.getPasswordResetID();
    if (!passwordResetID) {
      this.alertService.error('Expired or corrupt password change request.', true);
      return;
    }

    try {
      await this.backend.finishPasswordReset(passwordResetID, newPassword);

      this.alertService.success('Password successfully changed. Redirecting...');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } catch (err) {
      this.alertService.error(err.message);
    }
  }

  private async getPasswordResetID(): Promise<string> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => resolve(params.passwordResetID));
    });
  }
}
