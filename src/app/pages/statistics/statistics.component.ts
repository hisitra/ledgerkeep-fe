import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCardComponent } from 'src/app/components/chart-card/chart-card.component';
import { LedgerkeepService } from 'src/app/services/ledgerkeep.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

const dayInterval = 24 * 3600;
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
      const { data } = await this.ledgerkeep.getTransactionSum({ amount2: 0, byCategory: 'true' });
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
      const { data } = await this.ledgerkeep.getTransactionSum({ amount1: 0, byCategory: 'true' });
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
    const totalInterval = (Date.now() - firstExpenseTime) / 1000;

    const firstDate = new Date(firstExpenseTime);

    let type = '';
    const endDates = [];

    if (totalInterval > 4 * yearInterval) {
      type = 'year';

      const firstYear = firstDate.getFullYear();
      const currentMaxDate = new Date(new Date().getFullYear(), 12, 0);
      currentMaxDate.setHours(23, 59, 59, 999);

      for (let i = 0; true; i++) {
        const targetDate = new Date(firstYear + i, 12, 0);
        targetDate.setHours(23, 59, 59, 999);

        if (targetDate.getTime() > currentMaxDate.getTime()) {
          break;
        }

        endDates.push(targetDate.getTime() / 1000);
      }
    } else if (totalInterval > 4 * monthInterval) {
      type = 'month';

      const firstMonth = firstDate.getMonth();
      const firstYear = firstDate.getFullYear();
      const currentDate = new Date();
      const currentMaxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      currentMaxDate.setHours(23, 59, 59, 999);

      for (let i = 0; true; i++) {
        const targetDate = new Date(firstYear, firstMonth + i + 1, 0);
        targetDate.setHours(23, 59, 59, 999);

        if (targetDate > currentMaxDate) {
          break;
        }

        endDates.push(targetDate.getTime() / 1000);
      }
    } else {
      type = 'day';

      const currentMaxDate = new Date();
      currentMaxDate.setHours(23, 59, 59, 999);

      for (let i = 0; true; i++) {
        const targetDate = new Date(firstExpenseTime + dayInterval * 1000 * i);
        targetDate.setHours(23, 59, 59, 999);

        if (targetDate.getTime() > currentMaxDate.getTime()) {
          break;
        }

        endDates.push(targetDate.getTime() / 1000);
      }
    }

    const intervals = [];
    let lastEnd = firstExpenseTime / 1000;
    for (const endDate of endDates) {
      intervals.push([Math.floor(lastEnd), Math.floor(endDate)]);
      lastEnd = endDate;
    }

    let response;
    try {
      const { data } = await this.ledgerkeep.getTransactionSumByInterval({
        intervals: JSON.stringify(intervals),
      });
      response = data;
    } catch (err) {
      this.alert.error(err.message);
      return;
    }

    // Handling empty table.
    if (Object.keys(response).length === 0) {
      response = { [`0-${Date.now() / 1000}`]: 0 };
    }

    const table: any[] = [['Time', 'Balance']];
    let totalBal = 0;
    Object.keys(response).forEach((range) => {
      totalBal += response[range];

      const endTime = parseInt(range.split('-')[1], 10);
      const formatted = this.dateFormatter(new Date(endTime * 1000), type);
      table.push([formatted, totalBal]);
    });

    this.balanceChart.addAreaChart(table);
  }

  private dateFormatter(time: Date, type: string): string {
    if (type === 'year') {
      return time.getFullYear().toString();
    }
    if (type === 'month') {
      return `${monthNames[time.getMonth()]}'${time.getFullYear() - 2000}`;
    }
    return `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear() - 2000}`;
  }
}
