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
  @ViewChild('debitPieChart', { static: true }) debitPieChart: PieChartComponent;

  public debitPieChartData = [];
  public debitPieChartLabels = [];

  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    try {
      const response = await this.backend.getSum({ group: 'category', endAmount: 0 });
      for (const entry of response.data) {
        this.debitPieChartData.push(entry.sum);
        this.debitPieChartLabels.push(entry.category);
      }
      this.debitPieChart.assignColors();
    } catch (err) {
      this.alertService.error(err.message);
    }
  }
}
