import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./job-post-list/job-post-list.module').then(
        (m) => m.JobPostListModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class JobPostFeatureModule {}
