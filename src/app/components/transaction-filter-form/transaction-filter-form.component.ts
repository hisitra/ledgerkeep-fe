import { Component, OnInit } from '@angular/core';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';

@Component({
  selector: 'app-transaction-filter-form',
  templateUrl: './transaction-filter-form.component.html',
  styleUrls: ['./transaction-filter-form.component.css'],
})
export class TransactionFilterFormComponent implements OnInit {
  constructor(private secondaryDrawerService: SecondaryDrawerService) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.secondaryDrawerService.close();
  }
}
