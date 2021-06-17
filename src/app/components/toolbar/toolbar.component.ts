import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  public readonly applicationName = 'ledgerkeep';

  constructor() {
    /* No empty functions allowed. */
  }

  ngOnInit(): void {
    /* No empty functions allowed. */
  }
}
