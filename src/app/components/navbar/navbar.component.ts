import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

import configs from '../../../assets/configs.json';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() sidenav: MatDrawer;

  public appName = configs.general.appName;

  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {}

  isLoggedOut(): boolean {
    return !this.authService.isSoftLoggedIn();
  }

  toggleSideNav(): void {
    this.sidenav.toggle();
  }

  logout(): void {
    this.sidenav.close();
    this.dialog.open(LogoutDialogComponent, {
      width: '400px',
      data: { action: () => this.authService.logout() },
    });
  }
}
