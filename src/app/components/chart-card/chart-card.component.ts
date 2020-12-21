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

  private isLoaded = false;

  constructor() {}

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.isLoaded = true;
    });
  }

  public async addPieChart(): Promise<void> {
    await this.waitForModuleLoad();
  }

  public async addAreaChart(): Promise<void> {
    await this.waitForModuleLoad();
  }

  public async addLineChart(): Promise<void> {
    await this.waitForModuleLoad();
  }

  public async addBarChart(): Promise<void> {
    await this.waitForModuleLoad();
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
}
