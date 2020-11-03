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
  rawData: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(
    private backend: BackendService,
    private alertService: AlertService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  async ngOnInit() {
    await this.loadTable();
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  async loadTable(): Promise<void> {
    this.isLoading = true;

    this.rawData = [];
    const calls = [this.backend.getCategories(), this.backend.getSum({ group: 'category' })];

    try {
      const results = await Promise.all(calls);

      const categories = results[0].data;
      const sums = results[1].data;

      categories.forEach((cat, index) => {
        let balance;

        sums.forEach((entry) => {
          if (entry.category === cat) {
            balance = entry.sum;
          }
        });

        this.rawData.push({ index: index + 1, name: cat, balance: balance || 0 });
      });

      this.dataSource = new MatTableDataSource(this.rawData);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  openNewCategoryDialog(): void {
    this.dialog.open(NewCategoryDialogComponent, {
      width: '400px',
      data: { action: this.createCategory.bind(this) },
    });
  }

  async createCategory(name: string): Promise<void> {
    try {
      await this.backend.createCategory(name);
      this.loadTable();
      this.alertService.success('Category created.');
    } catch (err) {
      this.alertService.error(err);
    }
  }

  async rowClick(row: any): Promise<void> {}
}
