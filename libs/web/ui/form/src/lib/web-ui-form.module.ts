import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormValidationsModule } from './validations';
import { WebUiFormComponent } from './web-ui-form.component';

@NgModule({
  declarations: [WebUiFormComponent],
  exports: [WebUiFormComponent],
  imports: [
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    // Validators
    FormValidationsModule,
  ],
})
export class WebUiFormModule {}
