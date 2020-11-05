import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  public isLoading = false;
  public categories: string[] = [];

  constructor() {}

  ngOnInit() {}

  public async createTransaction(data: { [key: string]: any }): Promise<void> {}
}
