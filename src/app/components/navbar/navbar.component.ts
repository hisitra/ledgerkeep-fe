import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

import configs from '../../../assets/configs.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() sidenav: MatDrawer;

  public appName = configs.general.appName;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  isLoggedOut(): boolean {
    return !this.authService.isSoftLoggedIn();
  }

  toggleSideNav(): void {
    this.sidenav.toggle();
  }

  logout(): void {
    this.sidenav.close();
    this.authService.logout();
  }
}
