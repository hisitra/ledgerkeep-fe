import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TransactionFilterSheetComponent } from 'src/app/components/transaction-filter-sheet/transaction-filter-sheet.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { MtqueryService } from 'src/app/services/mtquery.service';

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
  private skip: number;

  constructor(
    private backend: BackendService,
    private alertService: AlertService,
    private filterSheet: MatBottomSheet,
    private mtq: MtqueryService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.onPageEvent());

    setTimeout(() => {
      this.route.queryParams.subscribe((_) => this.loadTable());
    }, 0);
  }

  public openFilterSheet(): void {
    if (this.isLoading) {
      return;
    }

    this.filterSheet.open(TransactionFilterSheetComponent);
  }

  private async onPageEvent(): Promise<void> {
    this.loadTable();
  }

  private async loadTable(): Promise<void> {
    this.setLoading(true);

    this.limit = this.paginator.pageSize;
    this.skip = this.paginator.pageIndex * this.paginator.pageSize;

    const query = await this.mtq.getQuery();

    try {
      const result = await this.backend.getTransactions({
        limit: this.limit,
        skip: this.skip,
        ...query,
      });

      let transactions = result.data.values || [];
      transactions = transactions.map((tx: any, index: any) => {
        return {
          index: index + this.skip + 1,
          amount: tx.amount,
          category: tx.category,
          timestamp: tx.timestamp,
        };
      });

      this.dataSource = new MatTableDataSource<any>(transactions);
      this.paginator.length = result.data.totalCount;

      if (transactions.length === 0) {
        this.alertService.info('No transactions found.');
      }
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.setLoading(false);
  }

  private setLoading(state: boolean) {
    this.isLoading = state;

    if (state) {
      this.filterSheet.dismiss();
    }
  }
}
