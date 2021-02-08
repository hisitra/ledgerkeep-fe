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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
import { IconTitleRowComponent } from './components/icon-title-row/icon-title-row.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ActionHeaderCardComponent } from './components/action-header-card/action-header-card.component';
import { TransactionFilterFormComponent } from './components/transaction-filter-form/transaction-filter-form.component';

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
    IconTitleRowComponent,
    ConfirmDialogComponent,
    ActionHeaderCardComponent,
    TransactionFilterFormComponent,
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
