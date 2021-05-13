import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WebUiFormModule } from '@ngfire-showcase/web/ui/form';

import { AddCompanyDialogComponent } from './add-company.component';

@NgModule({
  imports: [MatDialogModule, MatButtonModule, WebUiFormModule],
  declarations: [AddCompanyDialogComponent],
})
export class AddCompanyDialogModule { }
