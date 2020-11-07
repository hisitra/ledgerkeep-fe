import { Component, Input, OnInit } from '@angular/core';

import { theme } from '../../../assets/configs.json';

@Component({
  selector: 'app-loading-header-card',
  templateUrl: './loading-header-card.component.html',
  styleUrls: ['./loading-header-card.component.css'],
})
export class LoadingHeaderCardComponent implements OnInit {
  @Input() value = '';
  @Input() public isLoading = false;

  public primaryColor = theme.dpaPrimary;

  constructor() {}

  ngOnInit() {}
}
