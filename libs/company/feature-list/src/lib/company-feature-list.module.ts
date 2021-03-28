import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataAccessModule } from '@ngfire-showcase/company/data-access';
import { WebUiTableModule } from '@ngfire-showcase/web/ui/table';
import { CompanyFeatureListComponent } from './company-feature-list.component';
import { JobPostFeatureListResolver } from './company-feature-list.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyFeatureListComponent,
    resolve: {
      data: JobPostFeatureListResolver,
    },
  },
];

@NgModule({
  declarations: [CompanyFeatureListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompanyDataAccessModule,
    WebUiTableModule,
  ],
  providers: [JobPostFeatureListResolver],
})
export class CompanyFeatureListModule {}
