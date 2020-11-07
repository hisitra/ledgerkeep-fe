import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-fab-button',
  templateUrl: './bottom-fab-button.component.html',
  styleUrls: ['./bottom-fab-button.component.css'],
})
export class BottomFabButtonComponent implements OnInit {
  @Input() iconName: string;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit() {}
}
