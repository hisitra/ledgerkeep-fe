import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class MaterialModule {}
