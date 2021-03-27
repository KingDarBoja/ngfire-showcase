import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDataAccessModule } from '@ngfire-showcase/company/data-access';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyListComponent,
  },
];

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompanyDataAccessModule,
  ],
})
export class CompanyFeatureListModule {}
