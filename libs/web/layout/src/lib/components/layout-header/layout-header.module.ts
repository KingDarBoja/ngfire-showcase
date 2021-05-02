import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutHeaderComponent } from './layout-header.component';

@NgModule({
  declarations: [LayoutHeaderComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule],
  exports: [LayoutHeaderComponent],
})
export class LayoutHeaderModule {}
