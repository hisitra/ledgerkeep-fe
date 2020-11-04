import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TransactionFilterSheetComponent } from 'src/app/components/transaction-filter-sheet/transaction-filter-sheet.component';
import { QuerystoreService } from 'src/app/services/querystore.service';

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

  private limit: number;
  private offset: number;

  constructor(
    private filterSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private queryStore: QuerystoreService,
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.onPageEvent());
    this.onPageEvent();
  }

  async onPageEvent(): Promise<void> {
    this.limit = this.paginator.pageIndex * this.paginator.pageSize;
    this.offset = this.paginator.pageSize;
  }

  openFilterSheet(): void {
    if (this.isLoading) {
      return;
    }

    this.filterSheet.open(TransactionFilterSheetComponent, {
      data: { action: () => this.loadTable() },
    });
  }

  async queryParams(): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(resolve);
    });
  }

  async loadTable(): Promise<void> {}
}
