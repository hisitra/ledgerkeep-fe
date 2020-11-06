import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DcPieFilterSheetComponent } from 'src/app/components/dc-pie-filter-sheet/dc-pie-filter-sheet.component';

@Component({
  selector: 'app-debit-pie-table',
  templateUrl: './debit-pie-table.component.html',
  styleUrls: ['./debit-pie-table.component.css'],
})
export class DebitPieTableComponent implements OnInit {
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
