import { Component, OnInit, ViewChild } from '@angular/core';
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

  public isCreditPieLoading = false;
  public isDebitPieLoading = false;

  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    this.loadDebitPieChart();
    this.loadCreditPieChart();
  }

  private async loadDebitPieChart(): Promise<void> {
    this.isDebitPieLoading = true;

    try {
      const result = await this.backend.getSum({ group: 'category', endAmount: 0 });
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
      this.creditPie.setData(result.data);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isCreditPieLoading = false;
  }
}
