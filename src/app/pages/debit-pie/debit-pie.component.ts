import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-debit-pie',
  templateUrl: './debit-pie.component.html',
  styleUrls: ['./debit-pie.component.css'],
})
export class DebitPieComponent implements AfterViewInit {
  @ViewChild('debitPieChart') debitPieChart: ChartCardComponent | undefined;

  public isDebitPieLoading = true;

  constructor(
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
  ) {}

  ngAfterViewInit(): void {
    this.loadDebitPieChart().finally(() => {
      this.isDebitPieLoading = false;
    });
  }

  private async loadDebitPieChart(): Promise<void> {
    let result: { [key: string]: number };

    const token = this.authService.getToken();

    try {
      result = await this.ledgerlens.getTransactionSumByCategory(token, { end_amount: 0 });
    } catch (err) {
      this.snack.error(err.message);
      return;
    }
    const table: any[] = [['Category', 'Amount']];
    Object.keys(result).forEach((cat) => {
      const amount = Math.round(Math.abs(result[cat]) * 100) / 100;
      table.push([cat, amount]);
    });

    this.debitPieChart?.addPieChart(table);
  }
}
