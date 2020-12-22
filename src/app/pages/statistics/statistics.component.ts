import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCardComponent } from 'src/app/components/chart-card/chart-card.component';
import { LedgerkeepService } from 'src/app/services/ledgerkeep.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

const dayInterval = 24 * 3600;
const weekInterval = dayInterval * 7;
const monthInterval = dayInterval * 30.45;
const yearInterval = monthInterval * 12;
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
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent;
  @ViewChild('creditPieChart') creditPieChart: ChartCardComponent;
  @ViewChild('balanceChart') balanceChart: ChartCardComponent;

  public isDebitPieLoading = true;
  public isCreditPieLoading = true;
  public isBalanceLineLoading = true;

  constructor(private ledgerkeep: LedgerkeepService, private alert: SnackbarService) {}

  async ngAfterViewInit(): Promise<void> {
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

    try {
      const { data } = await this.ledgerkeep.getTransactionSum({ amount2: 0, groupBy: 'category' });
      result = data;
    } catch (err) {
      this.alert.error(err.message);
      return;
    }

    const table: any[] = [['Category', 'Amount']];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      table.push([cat, amount]);
    });

    this.debitPieChart.addPieChart(table);
  }

  private async loadCreditPieChart(): Promise<void> {
    let result: { [key: string]: number };

    try {
      const { data } = await this.ledgerkeep.getTransactionSum({ amount1: 0, groupBy: 'category' });
      result = data;
    } catch (err) {
      this.alert.error(err.message);
      return;
    }

    const table: any[] = [['Category', 'Amount']];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      table.push([cat, amount]);
    });

    this.creditPieChart.addPieChart(table);
  }

  private async loadBalanceChart(): Promise<void> {
    const firstExpenseTime = await this.ledgerkeep.getFirstTransactionTimestamp();
    const interval = (Date.now() - firstExpenseTime) / 1000;
    const groupBy = this.getGroupByInterval(interval);

    let response;
    try {
      const { data } = await this.ledgerkeep.getTransactionSum({ groupBy });
      response = data;
    } catch (err) {
      this.alert.error(err.message);
      return;
    }

    const table: any[] = [['Time', 'Balance']];

    let totalBal = 0;
    Object.keys(response).forEach((span) => {
      const date = this.dateFormatter(span, groupBy);
      totalBal += response[span];
      table.push([date, totalBal]);
    });

    // Handling empty table.
    if (table.length === 1) {
      table.push([0, 0], [1, 0]);
    }

    this.balanceChart.addAreaChart(table);
  }

  private getGroupByInterval(interval: number): number {
    if (interval >= 4 * yearInterval) {
      return yearInterval;
    }
    if (interval >= 4 * monthInterval) {
      return monthInterval;
    }
    if (interval >= 4 * weekInterval) {
      return weekInterval;
    }
    return dayInterval;
  }

  private dateFormatter(seconds: string, interval: number): string {
    const date = new Date(parseInt(seconds, 10) * 1000);

    if (interval >= yearInterval) {
      return `${date.getFullYear()}`;
    }

    const month = monthNames[date.getMonth()];
    if (interval >= monthInterval) {
      return `${month}'${date.getFullYear() - 2000}`;
    }
    return `${date.getDate()} ${month}`;
  }
}
