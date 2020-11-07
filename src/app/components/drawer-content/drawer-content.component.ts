import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.css'],
})
export class DrawerContentComponent implements OnInit {
  items = [
    { name: 'Add Transaction', icon: 'add', link: '/add-transaction' },
    { name: 'My Transactions', icon: 'receipt', link: '/my-transactions' },
    { name: 'My Categories', icon: 'category', link: '/my-categories' },
    { name: 'Statistics', icon: 'insights', link: '/statistics' },
    { name: 'About', icon: 'info', link: 'about' },
  ];

  constructor() {}

  ngOnInit() {}
}
