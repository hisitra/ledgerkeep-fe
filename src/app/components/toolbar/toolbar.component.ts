import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  public readonly applicationName = 'ledgerkeep';

  constructor(public readonly authService: AuthService) {
    /* No empty functions allowed. */
  }

  ngOnInit(): void {
    /* No empty functions allowed. */
  }
}
