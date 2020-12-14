import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCardComponent } from 'src/app/components/chart-card/chart-card.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent;

  constructor() {}

  async ngAfterViewInit(): Promise<void> {}
}
