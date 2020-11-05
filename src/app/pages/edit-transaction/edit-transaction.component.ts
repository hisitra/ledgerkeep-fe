import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { EditTransactionCardComponent } from 'src/app/components/edit-transaction-card/edit-transaction-card.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  @ViewChild('editCard', { static: true }) editCard: EditTransactionCardComponent;

  public isLoading = true;
  public categories: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backend: BackendService,
    private alertService: AlertService,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    const calls = [
      this.backend.getCategories(),
      this.backend.getTransaction(await this.getTransactionID()),
    ];

    let results;
    try {
      results = await Promise.all(calls);

      this.categories = results[0].data;

      const transaction = results[1].data;
      this.editCard.setTransaction(transaction);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  async updateTransaction(transaction: any): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      await this.backend.updateTransaction(await this.getTransactionID(), transaction);
      this.alertService.success('Transaction updated.');
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  public openDeleteDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Confirm deletion?', action: () => this.deleteTransaction() },
    });
  }

  async deleteTransaction(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      await this.backend.deleteTransaction(await this.getTransactionID());
      this.router.navigate(['/my-transactions']);
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  async getTransactionID(): Promise<string> {
    return new Promise((resolve) => {
      this.route.params.subscribe((routeParams) => {
        resolve(routeParams.transactionID);
      });
    });
  }
}
