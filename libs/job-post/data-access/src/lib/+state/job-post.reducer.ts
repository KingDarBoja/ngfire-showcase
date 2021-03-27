import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as JobPostActions from './job-post.actions';
import { JobPostEntity } from './job-post.models';

export const JOB_POST_FEATURE_KEY = 'jobPost';

export interface State extends EntityState<JobPostEntity> {
  selectedId?: string; // which JobPost record has been selected
  loaded: boolean; // has the JobPost list been loaded
  error?: string | null; // last known error (if any)
}

export interface JobPostPartialState {
  readonly [JOB_POST_FEATURE_KEY]: State;
}

export const jobPostAdapter: EntityAdapter<JobPostEntity> = createEntityAdapter<JobPostEntity>();

export const initialState: State = jobPostAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const jobPostReducer = createReducer(
  initialState,
  on(JobPostActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(JobPostActions.loadJobPostSuccess, (state, { jobPosts }) =>
    jobPostAdapter.setAll(jobPosts, { ...state, loaded: true })
  ),
  on(JobPostActions.loadJobPostFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return jobPostReducer(state, action);
}
