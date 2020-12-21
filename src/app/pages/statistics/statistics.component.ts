import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCardComponent } from 'src/app/components/chart-card/chart-card.component';
import { LedgerkeepService } from 'src/app/services/ledgerkeep.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent;
  @ViewChild('creditPieChart') creditPieChart: ChartCardComponent;
  @ViewChild('expenseLineChart') expenseLineChart: ChartCardComponent;

  public isDebitPieLoading = false;
  public isCreditPieLoading = false;
  public isExpenseLineLoading = false;

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
}
