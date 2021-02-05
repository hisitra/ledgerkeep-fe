import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarContentComponent } from './components/sidebar-content/sidebar-content.component';
import { AuthSuccessComponent } from './pages/auth-success/auth-success.component';
import { AuthFailureComponent } from './pages/auth-failure/auth-failure.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

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
    ToolbarComponent,
    SidebarContentComponent,
    AuthSuccessComponent,
    AuthFailureComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
