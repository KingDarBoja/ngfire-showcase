import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./company-list/company-list.module').then(
        (m) => m.CompanyListModule
      ),
  },
  {
    path: ':companyId',
    loadChildren: () =>
      import('./company-detail/company-detail.module').then(
        (m) => m.CompanyDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompanyFeatureModule {}
