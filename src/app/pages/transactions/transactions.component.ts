import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private secDrawService: SecondaryDrawerService) {}

  ngOnInit(): void {}

  onFilterClick(): void {
    this.secDrawService.toggle();
  }
}
