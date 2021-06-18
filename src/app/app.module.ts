import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigModule } from './modules/config/config.module';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, ToolbarComponent, HomeComponent, FeatureCardComponent, FooterComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, ConfigModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
