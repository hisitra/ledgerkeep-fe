import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() btnColor = 'primary';
  @Input() spinnerColor = 'primary';
  @Input() spinnerDia = 24;
  @Input() btnText = 'OK';

  @Input() loading = false;
  @Input() disabled = false;

  public btnStyle: any = {};

  constructor() {}

  ngOnInit(): void {
    this.btnStyle.height = `${this.spinnerDia * 1.5}px`;
  }

  isNormal(): boolean {
    return !this.loading && !this.disabled;
  }

  isLoading(): boolean {
    return this.loading && !this.disabled;
  }

  isDisabled(): boolean {
    return this.disabled;
  }
}
