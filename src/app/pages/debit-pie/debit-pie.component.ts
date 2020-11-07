import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { DcPieFilterSheetComponent } from 'src/app/components/dc-pie-filter-sheet/dc-pie-filter-sheet.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { PieDataTableComponent } from 'src/app/components/pie-data-table/pie-data-table.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { PiequeryService } from 'src/app/services/piequery.service';

@Component({
  selector: 'app-debit-pie',
  templateUrl: './debit-pie.component.html',
  styleUrls: ['./debit-pie.component.css'],
})
export class DebitPieComponent implements OnInit {
  @ViewChild('debitPie', { static: true }) debitPie: PieChartComponent;
  @ViewChild('table', { static: true }) table: PieDataTableComponent;

  public isLoading = false;

  constructor(
    private filterSheet: MatBottomSheet,
    private backend: BackendService,
    private alertService: AlertService,
    private pq: PiequeryService,
    private route: ActivatedRoute,
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

    this.filterSheet.open(DcPieFilterSheetComponent);
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;

    const query = await this.pq.getQuery();

    try {
      const result = await this.backend.getSum({ group: 'category', endAmount: 0, ...query });
      if (result.data && result.data.length === 0) {
        throw new Error('No data found.');
      }

      this.debitPie.setData(result.data);
      this.table.setData(result.data);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }
}
