import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
})
export class SidenavContentComponent implements OnInit {
  public items = [
    { icon: 'receipt', name: 'My Transactions', link: '/transactions' },
    { icon: 'category', name: 'My Categories', link: '/categories' },
    { icon: 'pie_chart', name: 'Statistics', link: '/statistics' },
    { icon: 'info', name: 'About', link: '/about' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
