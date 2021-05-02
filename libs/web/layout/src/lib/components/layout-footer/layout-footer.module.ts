import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutFooterComponent } from './layout-footer.component';

@NgModule({
  declarations: [LayoutFooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutFooterComponent],
})
export class LayoutFooterModule {}
