import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expense-line-table',
  templateUrl: './expense-line-table.component.html',
  styleUrls: ['./expense-line-table.component.css'],
})
export class ExpenseLineTableComponent implements OnInit {
  @Input() isLoading = false;

  displayedColumns: string[] = ['index', 'interval', 'balance'];
  rawData: any[] = [];
  dataSource: MatTableDataSource<any>;

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

  constructor() {}

  ngOnInit() {}

  public setData(data: any[], intervalName: string): void {
    if (data.length === 0) {
      return;
    }

    this.rawData = [];
    let total = 0;

    data.forEach((value, index) => {
      total += value.sum;

      const date = new Date(value[intervalName]);
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

      this.rawData.push({
        index: index + 1,
        interval: label,
        balance: Math.round(total * 100) / 100,
      });
    });

    this.dataSource = new MatTableDataSource(this.rawData);
  }
}
