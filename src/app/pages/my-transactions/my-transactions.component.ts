import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionFilterSheetComponent } from 'src/app/components/transaction-filter-sheet/transaction-filter-sheet.component';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css'],
})
export class MyTransactionsComponent implements OnInit {
  public isLoading = false;

  displayedColumns: string[] = ['index', 'amount', 'category', 'date'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private filterSheet: MatBottomSheet) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.onPageEvent());
    this.onPageEvent();
  }

  async onPageEvent(): Promise<void> {
    const limit = this.paginator.pageIndex * this.paginator.pageSize;
    const offset = this.paginator.pageSize;
  }

  openFilterSheet(): void {
    if (this.isLoading) {
      return;
    }

    this.filterSheet.open(TransactionFilterSheetComponent);
  }
}
