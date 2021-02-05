import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './pages/landing/landing.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DebitPieComponent } from './pages/debit-pie/debit-pie.component';
import { CreditPieComponent } from './pages/credit-pie/credit-pie.component';
import { BalanceLineComponent } from './pages/balance-line/balance-line.component';
import { TransactionCountLineComponent } from './pages/transaction-count-line/transaction-count-line.component';
import { BalanceVarianceLineComponent } from './pages/balance-variance-line/balance-variance-line.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TransactionsComponent,
    CategoriesComponent,
    StatisticsComponent,
    AboutComponent,
    ProfileComponent,
    DebitPieComponent,
    CreditPieComponent,
    BalanceLineComponent,
    TransactionCountLineComponent,
    BalanceVarianceLineComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
