import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private backend: BackendService, private alertService: AlertService) {}

  ngOnInit() {}

  async onFormSubmit(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<boolean> {
    try {
      await this.backend.initSignup(email, firstName, lastName, password);
      this.alertService.info('Please check you mail to complete signup.', true);
      return true;
    } catch (err) {
      this.alertService.error(err.message);
      return false;
    }
  }
}
