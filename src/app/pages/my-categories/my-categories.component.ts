import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewCategoryDialogComponent } from 'src/app/components/new-category-dialog/new-category-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.css'],
})
export class MyCategoriesComponent implements OnInit {
  public isLoading = false;

  displayedColumns: string[] = ['index', 'name', 'balance'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private backend: BackendService,
    private alertService: AlertService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  async ngOnInit() {
    this.isLoading = true;

    try {
      const results = await this.backend.getSum({ group: 'category' });

      const rawData = [];
      results.data.forEach((entry, index) => {
        rawData.push({ index: index + 1, name: entry.category, balance: entry.sum });
      });

      this.dataSource = new MatTableDataSource(rawData);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  openNewCategoryDialog(): void {
    this.dialog.open(NewCategoryDialogComponent, {
      width: '400px',
    });
  }
}
