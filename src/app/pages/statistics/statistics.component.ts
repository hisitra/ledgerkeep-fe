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

  public isDebitPieLoading = false;
  public isCreditPieLoading = false;
  public isBalanceLineLoading = false;

  constructor(private ledgerkeep: LedgerkeepService, private alert: SnackbarService) {}

  async ngAfterViewInit(): Promise<void> {
    this.isDebitPieLoading = true;
    this.loadDebitPieChart().finally(() => {
      this.isDebitPieLoading = false;
    });

    this.isCreditPieLoading = true;
    this.loadCreditPieChart().finally(() => {
      this.isCreditPieLoading = false;
    });

    this.isBalanceLineLoading = true;
    this.loadExpenseLineChart().finally(() => {
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

  private async loadExpenseLineChart(): Promise<void> {
    const firstExpenseTime = await this.ledgerkeep.getFirstTransactionTimestamp();
    const interval = (Date.now() - firstExpenseTime) / 1000;

    let groupBy;
    if (interval >= 4 * yearInterval) {
      groupBy = yearInterval;
    } else if (interval >= 4 * monthInterval) {
      groupBy = monthInterval;
    } else if (interval >= 4 * weekInterval) {
      groupBy = weekInterval;
    } else {
      groupBy = dayInterval;
    }

    let response;
    try {
      const { data } = await this.ledgerkeep.getTransactionSum({ groupBy });
      response = data;
    } catch (err) {
      this.alert.error(err.message);
      return;
    }

    const table: any = [['Time', 'Balance']];

    let totalBal = 0;
    Object.keys(response).forEach((span) => {
      const date = this.dateFormatter(span, groupBy);
      totalBal += response[span];
      table.push([date, totalBal]);
    });

    this.balanceChart.addAreaChart(table);
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
