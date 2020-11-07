import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DcPieFilterSheetComponent } from 'src/app/components/dc-pie-filter-sheet/dc-pie-filter-sheet.component';
import { ElFilterSheetComponent } from 'src/app/components/el-filter-sheet/el-filter-sheet.component';
import { ExpenseLineTableComponent } from 'src/app/components/expense-line-table/expense-line-table.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { ElqService } from 'src/app/services/elq.service';
import { PiequeryService } from 'src/app/services/piequery.service';

@Component({
  selector: 'app-expense-line',
  templateUrl: './expense-line.component.html',
  styleUrls: ['./expense-line.component.css'],
})
export class ExpenseLineComponent implements OnInit {
  @ViewChild('expenseLine', { static: true }) expenseLine: LineChartComponent;
  @ViewChild('table', { static: true }) table: ExpenseLineTableComponent;

  public isLoading = false;

  constructor(
    private filterSheet: MatBottomSheet,
    private backend: BackendService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private elq: ElqService,
  ) {}

  ngOnInit() {
    this.loadData();

    setTimeout(() => {
      this.route.queryParams.subscribe((_) => this.loadData());
    }, 0);
  }

  openFilterSheet(): void {
    if (this.isLoading) {
      return;
    }

    this.filterSheet.open(ElFilterSheetComponent);
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;

    const query = await this.elq.getQuery();
    query.group = query.interval;
    delete query.interval;

    try {
      const result = await this.backend.getSum({ ...query });
      if (result.data && result.data.length === 0) {
        throw new Error('No data found.');
      }

      this.expenseLine.setData(result.data, query.group);
      this.table.setData(result.data, query.group);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }
}
