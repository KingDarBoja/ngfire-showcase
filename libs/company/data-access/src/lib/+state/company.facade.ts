import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CompanyActions from './company.actions';
import * as CompanyFeature from './company.reducer';
import * as CompanySelectors from './company.selectors';

@Injectable()
export class CompanyFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CompanySelectors.getCompanyLoaded));
  allCompany$ = this.store.pipe(select(CompanySelectors.getAllCompany));
  selectedCompany$ = this.store.pipe(select(CompanySelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CompanyActions.init());
  }
}
