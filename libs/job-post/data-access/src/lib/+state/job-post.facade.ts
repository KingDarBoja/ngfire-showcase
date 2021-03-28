import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { JobPostPartialState } from './job-post.reducer';
import { getJobPosts } from './job-post.selectors';

@Injectable()
export class JobPostFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  getJobPost$ = this.store.select(getJobPosts);

  constructor(private store: Store<JobPostPartialState>) {}
}
