import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { AlertSnackbarComponent } from './components/alert-snackbar/alert-snackbar.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotCardComponent } from './components/forgot-card/forgot-card.component';
import { HeaderCardComponent } from './components/header-card/header-card.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordResetCardComponent } from './components/password-reset-card/password-reset-card.component';
import { SignupCardComponent } from './components/signup-card/signup-card.component';
import { SignupConfirmComponent } from './pages/signup-confirm/signup-confirm.component';
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { UserInfoRowComponent } from './components/user-info-row/user-info-row.component';
import { UserGeneralUpdateCardComponent } from './components/user-general-update-card/user-general-update-card.component';
import { UserPasswordUpdateCardComponent } from './components/user-password-update-card/user-password-update-card.component';
import { DrawerContentComponent } from './components/drawer-content/drawer-content.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoadingHeaderCardComponent } from './components/loading-header-card/loading-header-card.component';
import { NewCategoryDialogComponent } from './components/new-category-dialog/new-category-dialog.component';
import { BottomFabButtonComponent } from './components/bottom-fab-button/bottom-fab-button.component';
import { TransactionFilterSheetComponent } from './components/transaction-filter-sheet/transaction-filter-sheet.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { EditTransactionComponent } from './pages/edit-transaction/edit-transaction.component';
import { EditTransactionCardComponent } from './components/edit-transaction-card/edit-transaction-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AddTransactionCardComponent } from './components/add-transaction-card/add-transaction-card.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DebitPieTableComponent } from './pages/debit-pie-table/debit-pie-table.component';
import { CreditPieTableComponent } from './pages/credit-pie-table/credit-pie-table.component';
import { ExpenseLineTableComponent } from './pages/expense-line-table/expense-line-table.component';
import { DcPieFilterSheetComponent } from './components/dc-pie-filter-sheet/dc-pie-filter-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    AboutComponent,
    LoginCardComponent,
    LoadingButtonComponent,
    AlertSnackbarComponent,
    AlertDialogComponent,
    ForgotPasswordComponent,
    ForgotCardComponent,
    HeaderCardComponent,
    PasswordResetComponent,
    PasswordResetCardComponent,
    SignupCardComponent,
    SignupConfirmComponent,
    UserInfoCardComponent,
    UserInfoRowComponent,
    UserGeneralUpdateCardComponent,
    UserPasswordUpdateCardComponent,
    DrawerContentComponent,
    AddTransactionComponent,
    MyTransactionsComponent,
    MyCategoriesComponent,
    StatisticsComponent,
    LoadingHeaderCardComponent,
    NewCategoryDialogComponent,
    BottomFabButtonComponent,
    TransactionFilterSheetComponent,
    LogoutDialogComponent,
    EditTransactionComponent,
    EditTransactionCardComponent,
    ConfirmDialogComponent,
    AddTransactionCardComponent,
    PieChartComponent,
    LineChartComponent,
    DebitPieTableComponent,
    CreditPieTableComponent,
    ExpenseLineTableComponent,
    DcPieFilterSheetComponent,
  ],
  entryComponents: [
    AlertSnackbarComponent,
    AlertDialogComponent,
    NewCategoryDialogComponent,
    TransactionFilterSheetComponent,
    LogoutDialogComponent,
    ConfirmDialogComponent,
    DcPieFilterSheetComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
