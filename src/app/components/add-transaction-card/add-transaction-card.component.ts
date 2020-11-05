import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-transaction-card',
  templateUrl: './add-transaction-card.component.html',
  styleUrls: ['./add-transaction-card.component.css'],
})
export class AddTransactionCardComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() action: () => any;

  private pIsLoading = false;

  @Input() set isLoading(value: boolean) {
    this.pIsLoading = value;
    // value ? this.editTxForm.disable() : this.editTxForm.enable();
  }

  get isLoading(): boolean {
    return this.pIsLoading;
  }

  constructor() {}

  ngOnInit() {}
}
