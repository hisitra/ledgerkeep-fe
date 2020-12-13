import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() sideNav: MatSidenav;

  constructor(public auth: AuthService, private confirm: ConfirmService) {}

  ngOnInit(): void {}

  public menuAction(): void {
    if (this.sideNav) {
      this.sideNav.toggle();
    }
  }

  async logout(): Promise<void> {
    const confirmed = await this.confirm.prompt('Confirm Logout?');
    if (!confirmed) {
      return;
    }

    this.auth.logout();
  }
}
