import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CompanyFirestoreService } from '../company-firestore.service';
import { companiesChanged, navigatedToCompanies } from './company.actions';

@Injectable()
export class CompanyEffects {
  navigatedToCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(navigatedToCompanies),
      switchMap(() =>
        this.companyFS.collection$().pipe(
          map((companies) => companiesChanged({ companies })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private readonly companyFS: CompanyFirestoreService,
  ) {}
}
