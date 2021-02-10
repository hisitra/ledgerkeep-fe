import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
})
export class CreateTransactionComponent implements OnInit {
  public txForm: FormGroup;
  public catNames: string[] = [];

  public isLoading = false;
  public isCategoryLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.txForm = this.formBuilder.group({
      amount: [''],
      amountType: ['debit'],
      date: [new Date()],
      category: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {}

  onCreateClick(): void {}
}
