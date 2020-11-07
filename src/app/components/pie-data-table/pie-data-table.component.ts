import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pie-data-table',
  templateUrl: './pie-data-table.component.html',
  styleUrls: ['./pie-data-table.component.css'],
})
export class PieDataTableComponent implements OnInit {
  @Input() isLoading = false;

  displayedColumns: string[] = ['index', 'name', 'balance', 'percentage'];
  rawData: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor() {}

  ngOnInit() {}

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  public setData(data: any[]): void {
    if (data.length === 0) {
      return;
    }

    const total = data.reduce((prev, current) => {
      return { sum: Math.abs(prev.sum) + Math.abs(current.sum) };
    });

    this.rawData = [];
    data.forEach((value, index) => {
      this.rawData.push({
        index: index + 1,
        name: value.category,
        balance: value.sum,
        percent: Math.round(Math.abs(value.sum / total.sum) * 10000) / 100,
      });
    });

    this.dataSource = new MatTableDataSource(this.rawData);
  }
}
