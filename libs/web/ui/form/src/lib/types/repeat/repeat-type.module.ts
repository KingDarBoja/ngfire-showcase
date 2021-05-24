import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RepeatTypeComponent } from './repeat-type.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormlyMaterialModule,
    FormlyModule.forChild({
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
    }),
  ],
  declarations: [RepeatTypeComponent],
  exports: [RepeatTypeComponent],
})
export class RepeatTypeModule {}
