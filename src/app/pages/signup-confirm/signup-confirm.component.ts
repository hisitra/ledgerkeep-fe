import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.css'],
})
export class SignupConfirmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private backend: BackendService,
  ) {}

  async ngOnInit() {
    const signupID = await this.getSignupID();
    if (!signupID) {
      this.alertService.error('Expired or corrupt confirmation link.', true);
      return;
    }

    try {
      await this.backend.finishSignup(signupID);
      this.alertService.success('Signup confirmed. Redirecting...');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } catch (err) {
      this.alertService.error(err.message);
    }
  }

  private async getSignupID(): Promise<string> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => resolve(params.signupID));
    });
  }
}
