import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  public readonly applicationName = 'LedgerKeep';

  @Input() sidebar: MatDrawer | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public menuAction(): void {
    this.sidebar?.toggle();
  }

  public async logout(): Promise<void> {
    this.sidebar?.close();
    await this.authService.logout();
  }
}
