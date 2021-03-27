import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromJobPost from './+state/job-post.reducer';
import { JobPostEffects } from './+state/job-post.effects';
import { JobPostFacade } from './+state/job-post.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromJobPost.JOB_POST_FEATURE_KEY,
      fromJobPost.reducer
    ),
    EffectsModule.forFeature([JobPostEffects]),
  ],
  providers: [JobPostFacade],
})
export class JobPostDataAccessModule {}
