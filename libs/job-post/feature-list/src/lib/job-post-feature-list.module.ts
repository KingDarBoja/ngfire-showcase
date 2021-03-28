import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobPostDataAccessModule } from '@ngfire-showcase/job-post/data-access';
import { WebUiTableModule } from '@ngfire-showcase/web/ui/table';
import { JobPostFeatureListComponent } from './job-post-feature-list.component';
import { JobPostFeatureListResolver } from './job-post-feature-list.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JobPostFeatureListComponent,
    resolve: {
      data: JobPostFeatureListResolver,
    },
  },
];

@NgModule({
  declarations: [JobPostFeatureListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JobPostDataAccessModule,
    WebUiTableModule,
  ],
  providers: [JobPostFeatureListResolver],
})
export class JobPostFeatureListModule {}
