import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JobPostEffects } from './+state/job-post.effects';
import { JobPostFacade } from './+state/job-post.facade';
import { JOB_POST_FEATURE_KEY, reducer } from './+state/job-post.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(JOB_POST_FEATURE_KEY, reducer),
    EffectsModule.forFeature([JobPostEffects]),
  ],
  providers: [JobPostFacade],
})
export class JobPostDataAccessModule {}
