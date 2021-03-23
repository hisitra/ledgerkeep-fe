import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { MatTableDataSource } from '@angular/material/table';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-credit-pie',
  templateUrl: './credit-pie.component.html',
  styleUrls: ['./credit-pie.component.css'],
})
export class CreditPieComponent implements AfterViewInit {
  @ViewChild('creditPieChart') creditPieChart: ChartCardComponent | undefined;

  displayedColumns: string[] = ['index', 'name', 'sum', 'percentage'];
  dataSource = new MatTableDataSource<any>();
  public isCreditPieLoading = true;
  public total = 0;

  constructor(
    private route: ActivatedRoute,
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
    public secDrawService: SecondaryDrawerService,
  ) {}

  private static paramMap2Obj(map: ParamMap): { [key: string]: string | null } {
    const queries: { [key: string]: string | null } = {};
    for (const key of map.keys) {
      queries[key] = map.get(key);
    }
    return queries;
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe((qMap) => {
      this.dataSource = new MatTableDataSource<any>();
      this.isCreditPieLoading = true;
      this.loadCreditPieChart(CreditPieComponent.paramMap2Obj(qMap)).finally(() => {
        this.isCreditPieLoading = false;
      });
    });
  }

  private async loadCreditPieChart(queries: any): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();

    try {
      result = await this.ledgerlens.getTransactionSumByCategory(token, {
        ...queries,
        start_amount: 0,
      });
    } catch (err) {
      this.snack.error(err.message);
      return;
    }

    let total = 0;
    Object.keys(result).forEach((cat) => {
      total += Math.round(Math.abs(result[cat]) * 100) / 100;
    });

    this.total = total;

    const table: any[] = [['Category', 'Amount']];
    const data: any[] = [];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      const percentage = Math.round((amount / total) * 100 * 100) / 100;

      table.push([cat, amount]);
      data.push({ name: cat, sum: amount, percentage });
    });
    this.dataSource.data = data;

    this.creditPieChart?.addPieChart(table);
  }
}
