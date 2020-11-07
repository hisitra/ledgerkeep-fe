import { Component, Input, OnInit } from '@angular/core';

import { theme } from '../../../assets/configs.json';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.css'],
})
export class HeaderCardComponent implements OnInit {
  @Input() value: string;

  public primaryColor = theme.dpaPrimary;

  constructor() {}

  ngOnInit() {}
}
