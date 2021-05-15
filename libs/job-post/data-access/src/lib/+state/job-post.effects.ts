import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { JobPostFirestoreService } from '../job-post-firestore.service';
import {
  companyChanged,
  countryChanged,
  jobPostsChanged,
  searchParamsChanged,
} from './job-post.actions';
import { getSearchParams } from './job-post.selectors';

@Injectable()
export class JobPostEffects {
  companyChanged$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(companyChanged),
      // Get all the search params from the store.
      withLatestFrom(this.store.select(getSearchParams)),
      // Create a new search params object with the new companyId
      map(([{ companyId }, searchParams]) => ({
        ...searchParams,
        companyId,
      })),
      // Dispatch action that the search params changed.
      map((searchParams) => searchParamsChanged({ searchParams }))
    );
  });

  countryChanged$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(countryChanged),
      // Get all the search params from the store.
      withLatestFrom(this.store.select(getSearchParams)),
      // Create a new search params object with the new countryId
      map(([{ countryId }, searchParams]) => ({
        ...searchParams,
        countryId,
      })),
      // Dispatch action that the search params changed.
      map((searchParams) => searchParamsChanged({ searchParams }))
    );
  });

  searchParamsChanged$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchParamsChanged),
      switchMap(({ searchParams }) => {
        let colQuery$ = this.jobPostFS.collection$();
        if (searchParams?.companyId !== undefined) {
          colQuery$ = this.jobPostFS.collection$((ref) =>
            ref.where('companyId', '==', searchParams.companyId)
          );
        }
        return colQuery$.pipe(
          map((jobPosts) => jobPostsChanged({ jobPosts })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private readonly jobPostFS: JobPostFirestoreService
  ) {}
}
