import { Component, OnInit, Input } from '@angular/core';

declare var google;

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnInit {
  @Input() public titleIcon = '';
  @Input() public title = '';
  @Input() public subtitle = '';

  constructor() {}

  ngOnInit(): void {}

  public async addPieChart(): Promise<void> {}

  public async addAreaChart(): Promise<void> {}

  public async addLineChart(): Promise<void> {}

  public async addBarChart(): Promise<void> {}
}
