import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedConfigTranslocoModule } from '@ngfire-showcase/shared/config-transloco';
import { WebUiFormModule } from '@ngfire-showcase/web/ui/form';

import { AuthPageComponent } from './auth-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedConfigTranslocoModule,
    WebUiFormModule,
  ],
  declarations: [AuthPageComponent],
  exports: [AuthPageComponent],
})
export class AuthPageModule {}
