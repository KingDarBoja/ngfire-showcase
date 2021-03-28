import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataAccessModule } from '@ngfire-showcase/company/data-access';
import { CompanyFeatureDetailComponent } from './company-feature-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyFeatureDetailComponent,
  },
];

@NgModule({
  declarations: [CompanyFeatureDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompanyDataAccessModule,
  ],
})
export class CompanyFeatureDetailModule {}
