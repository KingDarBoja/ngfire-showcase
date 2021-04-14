import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedDataAccessFirebaseModule } from '@ngfire-showcase/web/core/configuration-firebase';
import { WebLayoutComponent } from '@ngfire-showcase/web/layout';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@ngfire-showcase/web/core/environments';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
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
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedDataAccessFirebaseModule.forRoot({
      firebaseConfig: environment.firebase,
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({}),
  ],
})
export class WebShellFeatureModule {}
