import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'amount', 'date', 'category'];
  allowedLimits = [10, 25, 50, 100];

  rawData: any[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public secDrawService: SecondaryDrawerService,
    private route: ActivatedRoute,
    private router: Router,
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

  async loadTransactions(queries: { [key: string]: string | null }): Promise<void> {}

  private async getCurrentQuery(): Promise<{ [key: string]: string | null }> {
    return new Promise((resolve) => {
      const subscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
        resolve(TransactionsComponent.paramMap2Obj(params));
      });
      setTimeout(() => subscription.unsubscribe());
    });
  }
}
