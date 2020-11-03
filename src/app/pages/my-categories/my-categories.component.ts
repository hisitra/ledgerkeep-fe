import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.css'],
})
export class MyCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'txCount', 'balance'];
  dataSource: MatTableDataSource<any>;

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
