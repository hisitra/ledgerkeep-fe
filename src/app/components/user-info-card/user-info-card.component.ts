import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
})
export class UserInfoCardComponent implements OnInit {
  @Input() user: { email: string; firstName: string; lastName: string; createdAt: number };

  constructor() {}

  ngOnInit() {}
}
