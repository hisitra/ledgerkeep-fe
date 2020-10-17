import { Component, OnInit } from '@angular/core';

import configs from '../../../assets/configs.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public appName = configs.general.appName;

  constructor() {}

  ngOnInit() {}
}
