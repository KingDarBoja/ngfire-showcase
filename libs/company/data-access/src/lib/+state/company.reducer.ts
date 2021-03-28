import { createReducer, on, Action } from '@ngrx/store';
import { companiesChanged } from './company.actions';

import { CompanyEntity } from './company.models';

export const COMPANY_FEATURE_KEY = 'company';

export interface State {
  companies: ReadonlyArray<CompanyEntity>;
}

export interface CompanyPartialState {
  readonly [COMPANY_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  companies: [],
};

const companyReducer = createReducer(
  initialState,
  on(companiesChanged, (state, { companies }) => ({
    ...state,
    companies,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return companyReducer(state, action);
}
