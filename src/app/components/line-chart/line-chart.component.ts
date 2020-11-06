import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @Input() name = '';
  @Input() isLoading = false;
  @Input() moreLink = '.';

  chartInstance: any;

  private months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  private data: any[] = [];
  private intervalName = '';

  private options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Expense',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  static maxLabels(): number {
    return Math.floor(0.02014 * window.innerWidth + 5);
  }

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  onChartInit(event: any) {
    this.chartInstance = event;
  }

  public setData(data: any[], intervalName: string): void {
    if (data.length === 0) {
      return;
    }

    this.data = data;
    this.intervalName = intervalName;

    this.options.xAxis[0].data = [];
    this.options.series[0].data = [];

    const maxLabelCount = LineChartComponent.maxLabels();

    let total = 0;
    for (const entry of data) {
      const date = new Date(entry[intervalName]);
      let label: string;

      if (intervalName === 'year') {
        label = `${date.getFullYear()}`;
      } else if (intervalName === 'month') {
        label = `${this.months[date.getMonth()]}, ${date.getFullYear()}`;
      } else if (intervalName === 'day') {
        label = `${date.getDate()} ${this.months[date.getMonth()]}, ${date.getFullYear()}`;
      } else {
        label = date.toDateString();
      }

      this.options.xAxis[0].data.push(label);

      total += entry.sum;
      this.options.series[0].data.push(total);

      if (this.options.series[0].data.length >= maxLabelCount) {
        break;
      }
    }

    if (this.chartInstance) {
      this.chartInstance.setOption(this.options);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.data.length === 0) {
      return;
    }

    this.setData(this.data, this.intervalName);
  }
}
