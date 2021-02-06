import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-title-row',
  templateUrl: './icon-title-row.component.html',
  styleUrls: ['./icon-title-row.component.css'],
})
export class IconTitleRowComponent implements OnInit {
  @Input() iconName = '';
  @Input() title = '';
  @Input() value = '';
  @Input() valueColor = 'black';

  constructor() {}

  ngOnInit(): void {}
}
