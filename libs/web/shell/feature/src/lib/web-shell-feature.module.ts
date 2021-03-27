import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedDataAccessFirebaseModule } from '@ngfire-showcase/web/core/configuration-firebase';
import { WebLayoutComponent } from '@ngfire-showcase/web/layout';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      // Application routes here
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'company',
        loadChildren: () => import('@ngfire-showcase/company/feature-list').then((m) => m.CompanyFeatureListModule),
      },
      {
        path: 'not-found',
        loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedDataAccessFirebaseModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
})
export class WebShellFeatureModule {}
