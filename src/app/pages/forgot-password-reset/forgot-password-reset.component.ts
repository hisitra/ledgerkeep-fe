import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.scss'],
})
export class ForgotPasswordResetComponent implements OnInit {
  private forgotPasswordID: string;

  constructor(
    private route: ActivatedRoute,
    private alert: SnackbarService,
    private router: Router,
  ) {}

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
