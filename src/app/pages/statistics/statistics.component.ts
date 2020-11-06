import { Component, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('debitPie', { static: true }) debitPie: PieChartComponent;
  @ViewChild('creditPie', { static: true }) creditPie: PieChartComponent;
  @ViewChild('expenseLine', { static: true }) expenseLine: LineChartComponent;

  public isCreditPieLoading = false;
  public isDebitPieLoading = false;
  public isExpenseLineLoading = false;

  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    this.loadDebitPieChart();
    this.loadCreditPieChart();
    this.loadExpenseLineChart();
  }

  private async loadDebitPieChart(): Promise<void> {
    this.isDebitPieLoading = true;

    try {
      const result = await this.backend.getSum({ group: 'category', endAmount: 0 });
      if (result.data && result.data.length === 0) {
        throw new Error('No data found for chart.');
      }

      this.debitPie.setData(result.data);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isDebitPieLoading = false;
  }

  private async loadCreditPieChart(): Promise<void> {
    this.isCreditPieLoading = true;

    try {
      const result = await this.backend.getSum({ group: 'category', startAmount: 0 });
      if (result.data && result.data.length === 0) {
        throw new Error('No data found for chart.');
      }

      this.creditPie.setData(result.data);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isCreditPieLoading = false;
  }

  private async loadExpenseLineChart(): Promise<void> {
    this.isExpenseLineLoading = true;

    try {
      const result = await this.backend.getSum({ group: 'day' });
      if (result.data && result.data.length === 0) {
        throw new Error('No data found for chart.');
      }

      this.expenseLine.setData(result.data, 'day');
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isExpenseLineLoading = false;
  }
}
