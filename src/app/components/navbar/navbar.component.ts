import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import configs from '../../../assets/configs.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public appName = configs.general.appName;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  isLoggedOut(): boolean {
    return !this.authService.isSoftLoggedIn();
  }
}
