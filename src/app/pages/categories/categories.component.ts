import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateCategoryComponent } from '../../components/create-category/create-category.component';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { LedgerquillService } from '../../services/ledgerquill.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public isLoading = false;
  public delLoaderCount = 0;
  public delLoaders: { [key: string]: boolean } = {};

  displayedColumns: string[] = ['index', 'name', 'sum', 'actions'];

  dataSource = new MatTableDataSource<any>();

  constructor(
    private bottomSheet: MatBottomSheet,
    private ledgerlens: LedgerlensService,
    private ledgerquill: LedgerquillService,
    private authService: AuthService,
    private snack: SnackService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.loadCategoryData();
    this.isLoading = false;
  }

  onRowClick(row: any, ind: number): void {}

  async onDeleteClick($event: MouseEvent, element: any, ind: number): Promise<void> {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.delLoaders[element.name]) {
      return;
    }
    this.delLoaders[element.name] = true;
    this.delLoaderCount += 1;

    const token = this.authService.getToken();

    try {
      await this.ledgerquill.deleteCategory(token, element.name);

      this.snack.success(`Deleted '${element.name}'.`);
      this.dataSource.data = this.dataSource.data.filter((value, i) => i !== ind);
    } catch (err) {
      this.snack.error(err.message);
    }

    delete this.delLoaders[element.name];
    this.delLoaderCount -= 1;
  }

  async loadCategoryData(): Promise<void> {
    const token = this.authService.getToken();

    let results: any[];
    try {
      results = await Promise.all([
        this.ledgerlens.getTransactionSumByCategory(token),
        this.ledgerlens.getCategories(token),
      ]);
    } catch (err) {
      this.snack.error(err.message);
      return;
    }

    const tableData: any[] = [];
    Object.keys(results[0]).forEach((key) => {
      tableData.push({ name: key, sum: Math.round(results[0][key] * 100) / 100 });
    });

    ((results[1] || []) as any[]).forEach((entry) => {
      if (results[0].hasOwnProperty(entry)) {
        return;
      }
      tableData.push({ name: entry, sum: 0 });
    });

    this.dataSource.data = tableData;
  }

  onAddClick(): void {
    this.bottomSheet.open(CreateCategoryComponent, {
      panelClass: 'bottom-sheet',
      data: {
        onCreate: (name: string) => {
          this.dataSource.data = [...this.dataSource.data, { name, sum: 0 }];
        },
      },
    });
  }
}
