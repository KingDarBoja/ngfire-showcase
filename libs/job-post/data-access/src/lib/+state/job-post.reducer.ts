import { createReducer, on, Action } from '@ngrx/store';

import { JobPostEntity, JobSearchParams } from './job-post.models';
import { jobPostsChanged, searchParamsChanged } from './job-post.actions';

export const JOB_POST_FEATURE_KEY = 'jobPost';

export interface State {
  jobPosts: ReadonlyArray<JobPostEntity>;
  readonly searchParams?: JobSearchParams;
}

export interface JobPostPartialState {
  readonly [JOB_POST_FEATURE_KEY]: State;
}

// Set initial required properties
export const initialState: State = {
  jobPosts: [],
};

const jobPostReducer = createReducer(
  initialState,
  on(searchParamsChanged, (state, { searchParams }) => ({
    ...state,
    searchParams,
  })),
  on(jobPostsChanged, (state, { jobPosts }) => ({
    ...state,
    jobPosts,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return jobPostReducer(state, action);
}
