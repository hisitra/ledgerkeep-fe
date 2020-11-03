import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
})
export class UserInfoCardComponent implements OnInit {
  @Input() user: { email: string; firstName: string; lastName: string; createdAt: number };
  @Input() balance = 0.0;
  @Input() txCount = 0;
  @Input() catCount = 0;

  constructor() {}

  ngOnInit() {}
}
