import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.sass'],
})
export class FeatureCardComponent implements OnInit {
  @Input() imgSrc = '';
  @Input() title = '';
  @Input() body = '';

  public cardClass = 'mat-elevation-z1';

  constructor() {
    /* No empty functions allowed. */
  }

  ngOnInit(): void {
    /* No empty functions allowed. */
  }

  public liftCard(): void {
    this.cardClass = 'mat-elevation-z6';
  }

  public dropCard(): void {
    this.cardClass = 'mat-elevation-z2';
  }
}
