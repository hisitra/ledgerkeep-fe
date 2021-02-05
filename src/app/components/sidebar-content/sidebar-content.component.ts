import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css'],
})
export class SidebarContentComponent implements OnInit {
  public readonly items = [
    { icon: 'receipt', name: 'My Transactions', link: '/transactions' },
    { icon: 'category', name: 'My Categories', link: '/categories' },
    { icon: 'pie_chart', name: 'Statistics', link: '/statistics' },
    { icon: 'info', name: 'About', link: '/about' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
