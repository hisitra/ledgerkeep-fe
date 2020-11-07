import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  public isLoading = false;
  public categories: string[] = [];

  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    this.isLoading = true;

    let results;
    try {
      results = await this.backend.getCategories();

      this.categories = results.data;
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  public async createTransaction(data: { [key: string]: any }): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      await this.backend.putTransaction(data);
      this.alertService.success('Transaction created.');
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }
}
