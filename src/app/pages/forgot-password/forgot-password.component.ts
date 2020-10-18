import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  async sendCode(email: string): Promise<void> {}

  async changePassword(code: string, newPassword: string): Promise<void> {}
}
