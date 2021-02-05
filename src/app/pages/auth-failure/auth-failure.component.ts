import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-auth-failure',
  templateUrl: './auth-failure.component.html',
  styleUrls: ['./auth-failure.component.css'],
})
export class AuthFailureComponent implements OnInit {
  constructor(private router: Router, private snack: SnackService) {}

  async ngOnInit(): Promise<void> {
    this.snack.error('Failed to login. Please try again.');
    await this.router.navigate(['/landing']);
  }
}
