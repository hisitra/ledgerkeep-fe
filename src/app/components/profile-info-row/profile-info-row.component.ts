import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-info-row',
  templateUrl: './profile-info-row.component.html',
  styleUrls: ['./profile-info-row.component.scss'],
})
export class ProfileInfoRowComponent implements OnInit {
  @Input() iconName = '';
  @Input() heading = '';
  @Input() value = '';
  @Input() valueColor = 'black';

  constructor() {}

  ngOnInit(): void {}
}
