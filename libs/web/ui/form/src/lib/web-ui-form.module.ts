import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { DatetimeTypeModule } from './types/datetime/datetime-type.module';
import { PhoneTypeModule } from './types/phone/phone-type.module';
import { RepeatTypeModule } from './types/repeat/repeat-type.module';
import { FormValidationsModule } from './validations';
import { WebUiFormComponent } from './web-ui-form.component';

@NgModule({
  declarations: [WebUiFormComponent],
  exports: [WebUiFormComponent],
  imports: [
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      extras: {
        checkExpressionOn: 'modelChange',
        lazyRender: true,
      },
    }),
    DatetimeTypeModule,
    PhoneTypeModule,
    RepeatTypeModule,
    // Validators
    FormValidationsModule,
  ],
})
export class WebUiFormModule {}
