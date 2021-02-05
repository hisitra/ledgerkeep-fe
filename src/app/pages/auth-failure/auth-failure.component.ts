import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-failure',
  templateUrl: './auth-failure.component.html',
  styleUrls: ['./auth-failure.component.css'],
})
export class AuthFailureComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/landing']);
  }
}
