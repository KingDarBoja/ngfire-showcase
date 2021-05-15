import { createReducer, on, Action } from '@ngrx/store';

import { JobPostEntity, JobSearchParams } from './job-post.models';
import { jobPostsChanged, searchParamsChanged } from './job-post.actions';

export const JOB_POST_FEATURE_KEY = 'jobPost';

export interface JobPostState {
  jobPosts: ReadonlyArray<JobPostEntity>;
  readonly searchParams?: JobSearchParams;
}

// Set initial required properties
export const initialState: JobPostState = {
  jobPosts: [],
};

const jobPostReducer = createReducer(
  initialState,
  on(
    searchParamsChanged,
    (state, { searchParams }): JobPostState => ({
      ...state,
      searchParams,
    })
  ),
  on(
    jobPostsChanged,
    (state, { jobPosts }): JobPostState => ({
      ...state,
      jobPosts,
    })
  )
);

export function reducer(state: JobPostState | undefined, action: Action) {
  return jobPostReducer(state, action);
}
