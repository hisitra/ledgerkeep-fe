import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() height = '50px';
  @Input() width = '96%';
  @Input() isLoading = false;
  @Input() value = '';
  @Input() disabled = false;
  @Input() spinnerDia = 25;

  constructor() {}

  ngOnInit() {}

  isButtonDisabled(): boolean {
    return this.isLoading || this.disabled;
  }

  isSpinnerVisible(): boolean {
    return this.isLoading && !this.disabled;
  }
}
