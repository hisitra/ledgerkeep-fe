import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePass = true;
  public isLoading = false;

  constructor() {}

  ngOnInit(): void {}

  async loginBtnAction(): Promise<void> {}
}
