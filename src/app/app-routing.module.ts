import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AntiAuthGuardService } from './guards/anti-auth-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { ForgotPasswordResetComponent } from './pages/forgot-password-reset/forgot-password-reset.component';
import { ConfirmSignupComponent } from './pages/confirm-signup/confirm-signup.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AntiAuthGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AntiAuthGuardService],
  },
  {
    path: 'confirm-signup',
    component: ConfirmSignupComponent,
    canActivate: [AntiAuthGuardService],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AntiAuthGuardService],
  },
  {
    path: 'forgot-password-reset',
    component: ForgotPasswordResetComponent,
    canActivate: [AntiAuthGuardService],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
