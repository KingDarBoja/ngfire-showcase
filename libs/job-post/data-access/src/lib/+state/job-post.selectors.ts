import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  JOB_POST_FEATURE_KEY,
  State,
  JobPostPartialState,
  jobPostAdapter,
} from './job-post.reducer';

// Lookup the 'JobPost' feature state managed by NgRx
export const getJobPostState = createFeatureSelector<
  JobPostPartialState,
  State
>(JOB_POST_FEATURE_KEY);

const { selectAll, selectEntities } = jobPostAdapter.getSelectors();

export const getJobPostLoaded = createSelector(
  getJobPostState,
  (state: State) => state.loaded
);

export const getJobPostError = createSelector(
  getJobPostState,
  (state: State) => state.error
);

export const getAllJobPost = createSelector(getJobPostState, (state: State) =>
  selectAll(state)
);

export const getJobPostEntities = createSelector(
  getJobPostState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getJobPostState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getJobPostEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
