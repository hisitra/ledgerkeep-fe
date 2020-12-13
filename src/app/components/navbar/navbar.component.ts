import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private confirm: ConfirmService) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    const confirmed = await this.confirm.prompt('Confirm Logout?');
    if (!confirmed) {
      return;
    }

    this.auth.logout();
  }
}
