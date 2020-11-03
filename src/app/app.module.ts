import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  entryComponents: [AlertSnackbarComponent, AlertDialogComponent],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
