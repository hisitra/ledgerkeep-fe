import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
})
export class UserInfoCardComponent implements OnInit {
  @Input() user: { email: string; firstName: string; lastName: string; createdAt: number };
  @Input() txCount = 0;
  @Input() catCount = 0;

  private pBalance: string;

  @Input() set balance(value: any) {
    this.pBalance = (value > 0 ? '+' : '') + value;
  }

  get balance(): any {
    return this.pBalance;
  }

  constructor() {}

  ngOnInit() {}
}
