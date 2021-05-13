import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { WebUiTableComponent } from './web-ui-table.component';
import { TypeSafeMatCellDefDirective } from './type-safe-mat-cell-def.directive';
// import { TypeSafeMatRowDefDirective } from './type-safe-mat-row-def.directive';

@NgModule({
  imports: [CommonModule, CdkTableModule, MatTableModule],
  declarations: [
    WebUiTableComponent,
    TypeSafeMatCellDefDirective,
    // TypeSafeMatRowDefDirective,
  ],
  exports: [WebUiTableComponent],
})
export class WebUiTableModule {}
