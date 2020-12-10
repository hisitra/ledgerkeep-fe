import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthkeepService } from 'src/app/services/authkeep.service';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss'],
})
export class ConfirmSignupComponent implements OnInit {
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: SnackbarService,
    private authkeep: AuthkeepService,
  ) {}

  async ngOnInit(): Promise<void> {
    const signupID = await this.getSignupID();

    if (!signupID) {
      this.alert.error('Invalid confirmation link.');
      return;
    }

    this.isLoading = true;
    try {
      await this.authkeep.putUser(signupID);
      this.alert.success('Signup successful.');
      this.router.navigate(['/login']);
    } catch (err) {
      this.alert.error(err.message);
      this.router.navigate(['/signup']);
    }
    this.isLoading = false;
  }

  private async getSignupID(): Promise<string> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => {
        resolve(params.signupID);
      });
    });
  }
}
