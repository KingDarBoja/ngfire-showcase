import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebUiFormModule } from '@ngfire-showcase/web/ui/form';

import { AddCompanyDialogComponent } from './add-company.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    WebUiFormModule,
  ],
  declarations: [AddCompanyDialogComponent],
})
export class AddCompanyDialogModule {}
