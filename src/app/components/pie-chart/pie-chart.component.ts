import { Component, Input, OnInit } from '@angular/core';

import { theme } from '../../../assets/configs.json';

import { ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() public title = '';
  @Input() public chartData = [];
  @Input() public chartLabels = [];

  public primaryColor = theme.dpaPrimary;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
        anchor: 'end',
        align: 'end',
        display: 'auto',
      },
    },
  };
  public chartPlugins = [pluginDataLabels];
  public chartColors = [{ backgroundColor: [] }];

  constructor(private random: RandomService) {}

  ngOnInit(): void {}

  public assignColors(): void {
    for (const entry of this.chartLabels) {
      const color = this.random.color();
      this.chartColors[0].backgroundColor.push(`rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`);
    }
  }
}
