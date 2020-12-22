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
  @Input() public isChartLoading = false;

  public chartHolderID = '';
  public isLoaded = false;

  private chart: any;

  constructor() {
    this.chartHolderID = this.randomIDGen();
  }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.isLoaded = true;
    });
  }

  public async addPieChart(table: any[]): Promise<void> {
    await this.waitForModuleLoad();

    this.chart = new google.visualization.PieChart(document.getElementById(this.chartHolderID));

    const data = google.visualization.arrayToDataTable(table);
    this.chart.draw(data, {
      theme: 'material',
      pieSliceText: 'none',
      legend: { position: 'labeled' },
      chartArea: { width: '80%', height: '80%' },
    });
  }

  public async addAreaChart(table: any[]): Promise<void> {
    await this.waitForModuleLoad();

    this.chart = new google.visualization.AreaChart(document.getElementById(this.chartHolderID));
    const data = google.visualization.arrayToDataTable(table);
    this.chart.draw(data, {
      theme: 'material',
      legend: { position: 'none' },
    });
  }

  public async addLineChart(): Promise<void> {
    await this.waitForModuleLoad();
  }

  public async addColumnChart(table: any[]): Promise<void> {
    await this.waitForModuleLoad();

    this.chart = new google.visualization.ColumnChart(document.getElementById(this.chartHolderID));
    const data = google.visualization.arrayToDataTable(table);
    this.chart.draw(data, {
      theme: 'material',
      legend: { position: 'none' },
    });
  }

  private async waitForModuleLoad(): Promise<void> {
    const checkIntervalMS = 1000;
    let retryLeft = 100;

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.isLoaded) {
          clearInterval(interval);
          return resolve();
        }

        retryLeft = retryLeft - 1;
        if (retryLeft <= 0) {
          clearInterval(interval);
          return reject(new Error('Failed to load chart module.'));
        }
      }, checkIntervalMS);
    });
  }

  private randomIDGen(): string {
    let randStr = '';
    for (let iter = 0; iter < 10; iter++) {
      randStr += `${Math.floor(Math.random() * 10)}`;
    }

    return `chart-holder-${Date.now()}-${randStr}`;
  }
}
