import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements AfterViewInit {
  public isLoading = false;

  displayedColumns: string[] = ['index', 'amount', 'date', 'category'];
  allowedLimits = [10, 25, 50, 100];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public secDrawService: SecondaryDrawerService,
    private route: ActivatedRoute,
    private router: Router,
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
  ) {}

  private static paramMap2Obj(map: ParamMap): { [key: string]: string | null } {
    const queries: { [key: string]: string | null } = {};
    for (const key of map.keys) {
      queries[key] = map.get(key);
    }
    return queries;
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.paginator?.page.subscribe(() => this.onPageEvent());

    this.route.queryParamMap.subscribe((paramsMap) => {
      const queries = TransactionsComponent.paramMap2Obj(paramsMap);

      setTimeout(() => {
        const parsedLimit = parseInt(queries.limit || '', 10);
        if (this.paginator && this.allowedLimits.includes(parsedLimit)) {
          this.paginator.pageSize = parsedLimit;
        }
        const parsedOffset = parseInt(queries.offset || '', 10);
        if (this.paginator && parsedOffset % this.paginator.pageSize === 0) {
          this.paginator.pageIndex = parsedOffset / this.paginator.pageSize;
        }

        queries.limit = (this.paginator
          ? this.paginator.pageSize
          : this.allowedLimits[0] || 10
        ).toString();
        queries.ffset = (this.paginator
          ? this.paginator.pageIndex * this.paginator.pageSize
          : 0
        ).toString();

        this.loadTransactions(queries);
      });
    });
  }

  async onPageEvent(): Promise<void> {
    const limit = this.paginator ? this.paginator.pageSize : this.allowedLimits[0] || 10;
    const offset = this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;

    const currentQuery = await this.getCurrentQuery();
    currentQuery.limit = `${limit}`;
    currentQuery.offset = `${offset}`;

    await this.router.navigate([], { queryParams: currentQuery });
  }

  async loadTransactions(queries: { [key: string]: string | null }): Promise<void> {
    const token = this.authService.getToken();

    this.isLoading = true;
    try {
      const { total_count, docs } = await this.ledgerlens.getTransactions(token, queries);
      if (this.paginator) {
        this.paginator.length = total_count;
      }

      this.dataSource = new MatTableDataSource<any>(
        (docs as any[]).map((value, index) => {
          return {
            index: index + 1,
            amount: value.amount,
            date: value.timestamp,
            category: value.category,
          };
        }),
      );
    } catch (err) {
      this.snack.error(err.message);
    }
    this.isLoading = false;
  }

  private async getCurrentQuery(): Promise<{ [key: string]: string | null }> {
    return new Promise((resolve) => {
      const subscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
        resolve(TransactionsComponent.paramMap2Obj(params));
      });
      setTimeout(() => subscription.unsubscribe());
    });
  }
}
