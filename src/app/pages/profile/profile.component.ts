import { Component, OnInit } from '@angular/core';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user = {
    email: '',
    doc_created_at: 0,
  };

  public userBalance = 0.0;
  public userTransactionCount = 0;
  public userCategoryCount = 0;
  public isLoading = false;

  constructor(private ledgerlens: LedgerlensService, private authService: AuthService) {}

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
    this.user = await this.ledgerlens.getUser(token);
  }

  private async loadBalance(): Promise<void> {}

  private async loadTxCount(): Promise<void> {}

  private async loadCatCount(): Promise<void> {}
}
