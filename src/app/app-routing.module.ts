import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { ProfileRedirectService } from './guards/profile-redirect.service';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { AboutComponent } from './pages/about/about.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupConfirmComponent } from './pages/signup-confirm/signup-confirm.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [ProfileRedirectService] },
  { path: 'login', component: LoginComponent, canActivate: [ProfileRedirectService] },
  { path: 'signup', component: SignupComponent, canActivate: [ProfileRedirectService] },
  { path: 'about', component: AboutComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ProfileRedirectService],
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [ProfileRedirectService],
  },
  {
    path: 'signup-confirm',
    component: SignupConfirmComponent,
    canActivate: [ProfileRedirectService],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'add-transaction', component: AddTransactionComponent, canActivate: [AuthGuardService] },
  { path: 'my-transactions', component: MyTransactionsComponent, canActivate: [AuthGuardService] },
  { path: 'my-categories', component: MyCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
