import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  public readonly applicationName = 'LedgerKeep';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  public menuAction(): void {}

  public logout(): void {}
}
