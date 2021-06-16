import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ConfigModule } from './modules/config/config.module';
import { MaterialModule } from './modules/material.module';

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, ConfigModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
