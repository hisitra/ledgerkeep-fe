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
import { OnlyLoggedOutService } from './guards/only-logged-out.service';
import { OnlyLoggedInService } from './guards/only-logged-in.service';
import { AuthSuccessComponent } from './pages/auth-success/auth-success.component';
import { AuthFailureComponent } from './pages/auth-failure/auth-failure.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent, canActivate: [OnlyLoggedOutService] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [OnlyLoggedInService] },
  { path: 'categories', component: CategoriesComponent, canActivate: [OnlyLoggedInService] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [OnlyLoggedInService] },
  { path: 'debit-pie', component: DebitPieComponent, canActivate: [OnlyLoggedInService] },
  { path: 'credit-pie', component: CreditPieComponent, canActivate: [OnlyLoggedInService] },
  { path: 'balance-line', component: BalanceLineComponent, canActivate: [OnlyLoggedInService] },
  {
    path: 'transaction-count-line',
    component: TransactionCountLineComponent,
    canActivate: [OnlyLoggedInService],
  },
  {
    path: 'balance-variance-line',
    component: BalanceVarianceLineComponent,
    canActivate: [OnlyLoggedInService],
  },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [OnlyLoggedInService] },
  { path: 'auth/success', component: AuthSuccessComponent, canActivate: [OnlyLoggedOutService] },
  { path: 'auth/failure', component: AuthFailureComponent, canActivate: [OnlyLoggedOutService] },
  { path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
