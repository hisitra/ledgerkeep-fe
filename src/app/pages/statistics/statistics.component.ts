import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent | undefined;
  @ViewChild('creditPieChart') creditPieChart: ChartCardComponent | undefined;
  @ViewChild('balanceChart') balanceChart: ChartCardComponent | undefined;

  public isDebitPieLoading = true;
  public isCreditPieLoading = true;
  public isBalanceLineLoading = true;

  constructor(
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
  ) {}

  ngAfterViewInit(): void {
    this.loadDebitPieChart().finally(() => {
      this.isDebitPieLoading = false;
    });

    this.loadCreditPieChart().finally(() => {
      this.isCreditPieLoading = false;
    });

    this.loadBalanceChart().finally(() => {
      this.isBalanceLineLoading = false;
    });
  }

  private async loadDebitPieChart(): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();

    try {
      result = await this.ledgerlens.getTransactionSumByCategory(token, { end_amount: 0 });
    } catch (err) {
      this.snack.error(err.message);
      return;
    }
    const table: any[] = [['Category', 'Amount']];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      table.push([cat, amount]);
    });

    this.debitPieChart?.addPieChart(table);
  }

  private async loadCreditPieChart(): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();

    try {
      result = await this.ledgerlens.getTransactionSumByCategory(token, { start_amount: 0 });
    } catch (err) {
      this.snack.error(err.message);
      return;
    }
    const table: any[] = [['Category', 'Amount']];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      table.push([cat, amount]);
    });

    this.creditPieChart?.addPieChart(table);
  }

  private async loadBalanceChart(): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();
    try {
      result = await this.ledgerlens.getTransactionSumByInterval(token);
      console.log(result);
    } catch (err) {
      this.snack.error(err.message);
      return;
    }

    const table: any[] = [['Time', 'Balance']];

    let totalBal = 0;
    Object.keys(result).forEach((time: string) => {
      const date = new Date(parseInt(time, 10));
      totalBal += result[time];

      const truncYear = date.getFullYear().toString().slice(2);
      table.push([`${monthNames[date.getMonth()]} ${date.getDate()}, '${truncYear}`, totalBal]);
    });

    this.balanceChart?.addAreaChart(table);
  }
}
