import { createReducer, on, Action } from '@ngrx/store';
import { companiesChanged } from './company.actions';

import { CompanyEntity } from './company.models';

export const COMPANY_FEATURE_KEY = 'company';

export interface CompanyState {
  companies: ReadonlyArray<CompanyEntity>;
}

export const initialState: CompanyState = {
  // set initial required properties
  companies: [],
};

const companyReducer = createReducer(
  initialState,
  on(companiesChanged, (state, { companies }): CompanyState => ({
    ...state,
    companies,
  })),
);

export function reducer(state: CompanyState | undefined, action: Action) {
  return companyReducer(state, action);
}
