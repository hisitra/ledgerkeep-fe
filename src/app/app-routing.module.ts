import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DebitPieComponent } from './pages/debit-pie/debit-pie.component';
import { CreditPieComponent } from './pages/credit-pie/credit-pie.component';
import { BalanceLineComponent } from './pages/balance-line/balance-line.component';
import { TransactionCountLineComponent } from './pages/transaction-count-line/transaction-count-line.component';
import { BalanceVarianceLineComponent } from './pages/balance-variance-line/balance-variance-line.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent, canActivate: [] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [] },
  { path: 'categories', component: CategoriesComponent, canActivate: [] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [] },
  { path: 'debit-pie', component: DebitPieComponent, canActivate: [] },
  { path: 'credit-pie', component: CreditPieComponent, canActivate: [] },
  { path: 'balance-line', component: BalanceLineComponent, canActivate: [] },
  { path: 'transaction-count-line', component: TransactionCountLineComponent, canActivate: [] },
  { path: 'balance-variance-line', component: BalanceVarianceLineComponent, canActivate: [] },
  { path: 'about', component: AboutComponent, canActivate: [] },
  { path: 'profile', component: ProfileComponent, canActivate: [] },
  { path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
