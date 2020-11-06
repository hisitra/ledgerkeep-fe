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

  private options: any = {
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
            length: 2,
            length2: 10,
          },
        },
      },
    ],
  };

  private static getChartRadii(): number[] {
    return [30, 0.053 * window.innerWidth + 76.91];
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
    this.chartInstance.setOption(this.options);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.options.series[0].radius = PieChartComponent.getChartRadii();

    if (this.chartInstance) {
      this.chartInstance.setOption(this.options);
    }
  }
}
