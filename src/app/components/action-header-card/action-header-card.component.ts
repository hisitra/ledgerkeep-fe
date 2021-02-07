import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-header-card',
  templateUrl: './action-header-card.component.html',
  styleUrls: ['./action-header-card.component.css'],
})
export class ActionHeaderCardComponent implements OnInit {
  @Input() header = '';
  @Input() iconName = '';
  @Input() onAction = () => {};

  constructor() {}

  ngOnInit(): void {}
}
