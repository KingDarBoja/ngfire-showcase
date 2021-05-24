import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';

import { MatDatepickerModule } from '@matheo/datepicker';
import {
  MatDateFnsModule,
  MAT_DATE_FNS_LOCALES,
} from '@matheo/datepicker/date-fns';
import { es, enUS } from 'date-fns/esm/locale';

import { DatetimeComponent } from './datetime-type.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatDateFnsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: DatetimeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'datetime',
          extends: 'date',
          defaultOptions: {
            templateOptions: { type: 'datetime', readonly: true },
          },
        },
        {
          name: 'time',
          extends: 'date',
          defaultOptions: {
            templateOptions: { type: 'time', readonly: true },
          },
        },
        {
          name: 'month',
          extends: 'date',
          defaultOptions: {
            templateOptions: { type: 'month', readonly: true },
          },
        },
        {
          name: 'year',
          extends: 'date',
          defaultOptions: {
            templateOptions: { type: 'year', readonly: true },
          },
        },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [DatetimeComponent],
  exports: [DatetimeComponent],
  providers: [
    {
      provide: MAT_DATE_FNS_LOCALES,
      useValue: [enUS, es],
    },
  ],
})
export class DatetimeTypeModule {}
