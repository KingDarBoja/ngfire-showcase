import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InlineScopeLoader,
  SharedConfigTranslocoModule,
} from '@ngfire-showcase/shared/config-transloco';

@NgModule({
  imports: [
    CommonModule,
    SharedConfigTranslocoModule.forChild(
      'auth',
      InlineScopeLoader((lang, root) => import(`./${root}/${lang}.json`)),
    ),
  ],
  exports: [SharedConfigTranslocoModule],
})
export class AuthUiModule {}
