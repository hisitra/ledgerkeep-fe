import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public readonly user = {
    email: '',
    doc_created_at: 0,
  };

  public readonly userBalance = 0.0;
  public readonly userTransactionCount = 0;
  public readonly userCategoryCount = 0;

  constructor() {}

  ngOnInit(): void {}
}
