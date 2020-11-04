import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private backend: BackendService,
    private alertService: AlertService,
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
    } catch (err) {
      this.alertService.error(err.message);
      return;
    }

    this.categories = results[0].data;

    const transaction = results[1].data;
    this.editCard.setTransaction(transaction);

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
