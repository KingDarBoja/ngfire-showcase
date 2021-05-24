import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { NgxMaskModule } from 'ngx-mask';

import { PhoneTypeComponent } from './phone-type.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    MatInputModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'phone',
          component: PhoneTypeComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              type: 'phone',
            },
          },
        },
        {
          name: 'text',
          extends: 'phone',
          defaultOptions: {
            templateOptions: {
              type: 'text',
            },
          },
        },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [PhoneTypeComponent],
  exports: [PhoneTypeComponent],
})
export class PhoneTypeModule {}
