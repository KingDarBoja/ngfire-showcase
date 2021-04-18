import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageModule, AuthUiModule } from '@ngfire-showcase/auth/ui';
import { AuthDataAccessModule } from '@ngfire-showcase/auth/data-access';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthPageModule,
    AuthDataAccessModule,
    AuthUiModule,
  ],
})
export class LoginModule {}
