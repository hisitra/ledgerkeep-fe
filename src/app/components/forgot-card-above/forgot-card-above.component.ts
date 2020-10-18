import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-card-above',
  templateUrl: './forgot-card-above.component.html',
  styleUrls: ['./forgot-card-above.component.css'],
})
export class ForgotCardAboveComponent implements OnInit {
  @Input() action: (email: string) => Promise<void>;

  constructor() {}

  ngOnInit() {}
}
