import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { JobPostFirestoreService } from '../job-post-firestore.service';
import * as JobPostFeature from './job-post.reducer';
import * as JobPostActions from './job-post.actions';

@Injectable()
export class JobPostEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobPostActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.jobPostFS
            .collection$()
            .pipe(
              map((jobPosts) => JobPostActions.loadJobPostSuccess({ jobPosts }))
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return JobPostActions.loadJobPostFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly jobPostFS: JobPostFirestoreService
  ) {}
}
