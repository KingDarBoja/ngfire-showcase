import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedDataAccessFirebaseModule } from '@ngfire-showcase/shared/config-firebase';
import { WebLayoutComponent } from '@ngfire-showcase/web/layout';
import { environment } from '@ngfire-showcase/shared/config-environments';
import {
  AuthDataAccessModule,
  LoggedInGuard,
} from '@ngfire-showcase/auth/data-access';
import { SharedConfigTranslocoModule } from '@ngfire-showcase/shared/config-transloco';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      // Application routes here
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('@ngfire-showcase/company/feature').then(
            (m) => m.CompanyFeatureModule
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('@ngfire-showcase/job-post/feature').then(
            (m) => m.JobPostFeatureModule
          ),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('@ngfire-showcase/auth/feature').then((m) => m.AuthFeatureModule),
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthDataAccessModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    SharedDataAccessFirebaseModule.forRoot({
      firebaseConfig: environment.firebase,
    }),
    SharedConfigTranslocoModule.forRoot(environment.production),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({}),
  ],
})
export class WebShellFeatureModule {}
