import { Component, OnInit } from '@angular/core';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user = {
    email: '',
    first_name: '',
    last_name: '',
    doc_created_at: 0,
  };

  public userBalance = 0.0;
  public userTransactionCount = 0;
  public userCategoryCount = 0;
  public isLoading = false;

  constructor(
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    await Promise.all([
      this.loadUser(),
      this.loadBalance(),
      this.loadTxCount(),
      this.loadCatCount(),
    ]);

    this.isLoading = false;
  }

  private async loadUser(): Promise<void> {
    const token = await this.authService.getToken();
    try {
      this.user = await this.ledgerlens.getUser(token);
    } catch (err) {
      this.snack.error(err.message);
    }
  }

  private async loadBalance(): Promise<void> {
    const token = await this.authService.getToken();
    try {
      const bal = await this.ledgerlens.getBalance(token);
      this.userBalance = Math.round(bal * 100) / 100;
    } catch (err) {
      this.snack.error(err.message);
    }
  }

  private async loadTxCount(): Promise<void> {
    const token = await this.authService.getToken();
    try {
      this.userTransactionCount = await this.ledgerlens.getTransactionCount(token);
    } catch (err) {
      this.snack.error(err.message);
    }
  }

  private async loadCatCount(): Promise<void> {
    const token = await this.authService.getToken();
    try {
      this.userCategoryCount = await this.ledgerlens.getCategoryCount(token);
    } catch (err) {
      this.snack.error(err.message);
    }
  }
}
