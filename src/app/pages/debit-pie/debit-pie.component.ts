import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { MatTableDataSource } from '@angular/material/table';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-debit-pie',
  templateUrl: './debit-pie.component.html',
  styleUrls: ['./debit-pie.component.css'],
})
export class DebitPieComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent | undefined;

  displayedColumns: string[] = ['index', 'name', 'sum', 'percentage'];
  dataSource = new MatTableDataSource<any>();
  public isDebitPieLoading = true;

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
      this.isDebitPieLoading = true;
      this.loadDebitPieChart(DebitPieComponent.paramMap2Obj(qMap)).finally(() => {
        this.isDebitPieLoading = false;
      });
    });
  }

  private async loadDebitPieChart(queries: any): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();

    try {
      result = await this.ledgerlens.getTransactionSumByCategory(token, {
        ...queries,
        end_amount: 0,
      });
    } catch (err) {
      this.snack.error(err.message);
      return;
    }

    let total = 0;
    Object.keys(result).forEach((cat) => {
      total += Math.round(Math.abs(result[cat]) * 100) / 100;
    });

    const table: any[] = [['Category', 'Amount']];
    const data: any[] = [];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      const percentage = Math.round((amount / total) * 100 * 100) / 100;

      table.push([cat, amount]);
      data.push({ name: cat, sum: amount, percentage });
    });
    this.dataSource.data = data;

    this.debitPieChart?.addPieChart(table);
  }
}
