import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css'],
})
export class MyTransactionsComponent implements OnInit {
  public isLoading = true;

  displayedColumns: string[] = ['index', 'amount', 'category', 'date'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.onPageEvent());
    this.onPageEvent();
  }

  async onPageEvent(): Promise<void> {
    const limit = this.paginator.pageIndex * this.paginator.pageSize;
    const offset = this.paginator.pageSize;
  }
}
