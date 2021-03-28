import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { CompanyPartialState } from './company.reducer';
import { getAllCompanies } from './company.selectors';

@Injectable()
export class CompanyFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
   getAllCompanies$ = this.store.select(getAllCompanies);

  constructor(private store: Store<CompanyPartialState>) {}
}
