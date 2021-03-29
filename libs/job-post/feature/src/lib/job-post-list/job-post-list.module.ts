import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobPostDataAccessModule } from '@ngfire-showcase/job-post/data-access';
import { WebUiTableModule } from '@ngfire-showcase/web/ui/table';
import { JobPostListComponent } from './job-post-list.component';
import { JobPostListResolver } from './job-post-list.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JobPostListComponent,
    resolve: {
      data: JobPostListResolver,
    },
  },
];

@NgModule({
  declarations: [JobPostListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JobPostDataAccessModule,
    WebUiTableModule,
  ],
  providers: [JobPostListResolver],
})
export class JobPostListModule {}
