import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataAccessModule } from '@ngfire-showcase/company/data-access';
import { WebUiTableModule } from '@ngfire-showcase/web/ui/table';
import { CompanyListResolver } from './company-list.resolver';
import { CompanyListComponent } from './company-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyListComponent,
    resolve: {
      data: CompanyListResolver,
    },
  },
];

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompanyDataAccessModule,
    WebUiTableModule,
  ],
  providers: [CompanyListResolver],
})
export class CompanyListModule {}
