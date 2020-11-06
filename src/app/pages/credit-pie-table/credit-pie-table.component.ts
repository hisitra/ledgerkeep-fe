import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DcPieFilterSheetComponent } from 'src/app/components/dc-pie-filter-sheet/dc-pie-filter-sheet.component';

@Component({
  selector: 'app-credit-pie-table',
  templateUrl: './credit-pie-table.component.html',
  styleUrls: ['./credit-pie-table.component.css'],
})
export class CreditPieTableComponent implements OnInit {
  public isLoading = false;

  constructor(private filterSheet: MatBottomSheet) {}

  ngOnInit() {}

  openFilterSheet(): void {
    if (this.isLoading) {
      return;
    }

    this.filterSheet.open(DcPieFilterSheetComponent);
  }
}
