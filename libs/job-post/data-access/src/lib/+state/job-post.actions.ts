import { createAction, props } from '@ngrx/store';
import { JobPostEntity } from './job-post.models';

export const init = createAction('[JobPost Page] Init');

export const loadJobPostSuccess = createAction(
  '[JobPost/API] Load JobPost Success',
  props<{ jobPosts: JobPostEntity[] }>()
);

export const loadJobPostFailure = createAction(
  '[JobPost/API] Load JobPost Failure',
  props<{ error: any }>()
);
