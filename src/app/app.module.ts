import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarContentComponent } from './components/sidebar-content/sidebar-content.component';
import { AuthSuccessComponent } from './pages/auth-success/auth-success.component';
import { AuthFailureComponent } from './pages/auth-failure/auth-failure.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { IconTitleRowComponent } from './components/icon-title-row/icon-title-row.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ActionHeaderCardComponent } from './components/action-header-card/action-header-card.component';
import { TransactionFilterFormComponent } from './components/transaction-filter-form/transaction-filter-form.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { PieFilterComponent } from './components/pie-filter/pie-filter.component';

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
    ToolbarComponent,
    SidebarContentComponent,
    AuthSuccessComponent,
    AuthFailureComponent,
    SnackbarComponent,
    IconTitleRowComponent,
    ConfirmDialogComponent,
    ActionHeaderCardComponent,
    TransactionFilterFormComponent,
    LoadingButtonComponent,
    EditTransactionComponent,
    FabButtonComponent,
    CreateTransactionComponent,
    CreateCategoryComponent,
    ChartCardComponent,
    PieFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
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
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
