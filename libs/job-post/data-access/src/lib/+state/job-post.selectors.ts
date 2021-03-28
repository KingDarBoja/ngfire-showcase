import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  JOB_POST_FEATURE_KEY,
  State,
  JobPostPartialState,
} from './job-post.reducer';

// Lookup the 'JobPost' feature state managed by NgRx
export const getJobPostState = createFeatureSelector<
  JobPostPartialState,
  State
>(JOB_POST_FEATURE_KEY);

export const getSearchParams = createSelector(
  getJobPostState,
  (state: State) => state.searchParams
);

export const getJobPosts = createSelector(
  getJobPostState,
  (state: State) => state.jobPosts
);
