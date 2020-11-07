import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() name = '';
  @Input() isLoading = false;
  @Input() moreLink = '.';
  @Input() hideMore = false;

  chartInstance: any;

  public options: any = {
    series: [
      {
        name: 'Debits',
        type: 'pie',
        center: ['50%', '50%'],
        radius: PieChartComponent.getChartRadii(),
        data: [{ value: 0, name: 'No data here.' }],
        roseType: 'radius',
        labelLine: {
          normal: {
            length: 20,
            length2: 10,
          },
        },
      },
    ],
  };

  private static getChartRadii(): number[] {
    const element = document.getElementById('card');
    const width = element ? element.clientWidth : window.innerWidth;

    return [30, 0.053 * width + 76.91];
  }

  constructor() {}

  ngOnInit(): void {}

  onChartInit(event: any) {
    this.chartInstance = event;
  }

  public setData(data: any[]): void {
    if (data.length === 0) {
      return;
    }

    const values = [];

    for (const entry of data) {
      values.push({ name: entry.category, value: Math.abs(entry.sum) });
    }

    this.options.series[0].data = values;

    if (this.chartInstance) {
      this.chartInstance.setOption(this.options);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.options.series[0].radius = PieChartComponent.getChartRadii();

    if (this.chartInstance) {
      this.chartInstance.setOption(this.options);
    }
  }
}
