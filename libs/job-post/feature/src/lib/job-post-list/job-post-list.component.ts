import { Component } from '@angular/core';
import {
  JobPostEntity,
  JobPostFacade,
} from '@ngfire-showcase/job-post/data-access';
import { WebUiTableColumn } from '@ngfire-showcase/web/ui/table';

@Component({
  templateUrl: 'job-post-list.component.html',
})
export class JobPostListComponent {
  getJobPost$ = this.jobPostFacade.getJobPost$;
  cols: WebUiTableColumn<JobPostEntity>[] = [
    {
      id: 'id',
      header: 'Identifier',
    },
    {
      id: 'companyId',
      header: 'Company Ref.',
    },
    {
      id: 'title',
      header: 'Title',
    },
  ];

  constructor(private readonly jobPostFacade: JobPostFacade) {}
}
