import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  async onFormSubmit(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void> {}
}
