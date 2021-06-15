import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonTypeComponent } from './button-type.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormlyModule.forChild({
      extras: {
        checkExpressionOn: 'modelChange',
        lazyRender: true,
      },
      types: [
        {
          name: 'button',
          component: ButtonTypeComponent,
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      ],
    }),
  ],
  declarations: [ButtonTypeComponent],
  exports: [ButtonTypeComponent],
})
export class ButtonTypeModule {}
