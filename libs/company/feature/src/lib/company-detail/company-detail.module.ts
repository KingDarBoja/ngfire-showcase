import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataAccessModule } from '@ngfire-showcase/company/data-access';
import { CompanyDetailComponent } from './company-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyDetailComponent,
  },
];

@NgModule({
  declarations: [CompanyDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompanyDataAccessModule,
  ],
})
export class CompanyDetailModule {}
