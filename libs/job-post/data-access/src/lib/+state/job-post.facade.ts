import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as JobPostActions from './job-post.actions';
import * as JobPostFeature from './job-post.reducer';
import * as JobPostSelectors from './job-post.selectors';

@Injectable()
export class JobPostFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(JobPostSelectors.getJobPostLoaded));
  allJobPost$ = this.store.pipe(select(JobPostSelectors.getAllJobPost));
  selectedJobPost$ = this.store.pipe(select(JobPostSelectors.getSelected));

  constructor(private store: Store<JobPostFeature.JobPostPartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(JobPostActions.init());
  }
}
