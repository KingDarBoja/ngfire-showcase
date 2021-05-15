import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobPostState, JOB_POST_FEATURE_KEY } from './job-post.reducer';

// Lookup the 'JobPost' feature state managed by NgRx
export const getJobPostState = createFeatureSelector<JobPostState>(
  JOB_POST_FEATURE_KEY
);

export const getSearchParams = createSelector(
  getJobPostState,
  (state: JobPostState) => state.searchParams
);

export const getJobPosts = createSelector(
  getJobPostState,
  (state: JobPostState) => state.jobPosts
);
