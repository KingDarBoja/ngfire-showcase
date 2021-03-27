import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CompanyFeature from './company.reducer';
import * as CompanyActions from './company.actions';

@Injectable()
export class CompanyEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CompanyActions.loadCompanySuccess({ companies: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CompanyActions.loadCompanyFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
