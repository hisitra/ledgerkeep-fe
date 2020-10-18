import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-card-below',
  templateUrl: './forgot-card-below.component.html',
  styleUrls: ['./forgot-card-below.component.css'],
})
export class ForgotCardBelowComponent implements OnInit {
  @Input() action: (code: string, newPassword: string) => Promise<void>;

  constructor() {}

  ngOnInit() {}
}
