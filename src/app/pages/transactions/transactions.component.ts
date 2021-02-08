import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'amount', 'date', 'category'];
  rawData: any[] = [];
  dataSource = new MatTableDataSource<any>(this.rawData);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public secDrawService: SecondaryDrawerService) {}

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
