import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as CompanyActions from './company.actions';
import * as CompanyFeature from './company.reducer';
import * as CompanySelectors from './company.selectors';
import { CompanyFirestoreService } from '../company-firestore.service';

@Injectable()
export class CompanyFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CompanySelectors.getCompanyLoaded));
  allCompany$ = this.store.pipe(select(CompanySelectors.getAllCompany));
  selectedCompany$ = this.store.pipe(select(CompanySelectors.getSelected));

  constructor(
    private store: Store<CompanyFeature.CompanyPartialState>,
    private companyFS: CompanyFirestoreService
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CompanyActions.init());
  }

  getCompanies() {
    this.companyFS
      .collection$()
      .pipe(
        map(companies => this.store.dispatch(CompanyActions.loadCompanySuccess({ companies }))),
        catchError(error => {
          this.store.dispatch(CompanyActions.loadCompanyFailure({ error }));
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
