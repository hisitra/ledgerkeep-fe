import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() isLoading = false;
  @Input() value = '';
  @Input() disabled = false;
  @Input() spinnerDia = 25;

  public buttonStyle: any = {};

  @Input() set width(value: string) {
    this.buttonStyle.width = value;
  }

  @Input() set height(value: string) {
    this.buttonStyle.height = value;
  }

  constructor() {
    this.buttonStyle.height = `${this.spinnerDia * 1.5}px`;
  }

  ngOnInit() {}

  isButtonDisabled(): boolean {
    return this.isLoading || this.disabled;
  }

  isSpinnerVisible(): boolean {
    return this.isLoading && !this.disabled;
  }
}
