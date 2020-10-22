import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-row',
  templateUrl: './user-info-row.component.html',
  styleUrls: ['./user-info-row.component.css'],
})
export class UserInfoRowComponent implements OnInit {
  @Input() iconName: string;
  @Input() heading: string;
  @Input() value: string;

  constructor() {}

  ngOnInit() {}
}
