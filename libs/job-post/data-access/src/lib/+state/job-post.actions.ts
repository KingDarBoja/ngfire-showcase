import { createAction, props } from '@ngrx/store';
import { JobPostEntity, JobSearchParams } from './job-post.models';

export const companyChanged = createAction(
  '[JobPost List] Company Changed',
  props<{ companyId?: string }>(),
);
export const countryChanged = createAction(
  '[JobPost List] Country changed',
  props<{ countryId?: string }>(),
);
export const searchParamsChanged = createAction(
  '[JobPost List] Search parameters changed',
  props<{ searchParams?: JobSearchParams }>(),
);
export const jobPostsChanged = createAction(
  '[JobPost List] Posts changed',
  props<{ jobPosts: ReadonlyArray<JobPostEntity> }>(),
);
