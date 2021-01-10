import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormComponent } from './form.component';
import { FormValidationsModule } from './validations';

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent],
  imports: [
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    // Validators
    FormValidationsModule,
  ],
})
export class SharedUiFormsModule {}
