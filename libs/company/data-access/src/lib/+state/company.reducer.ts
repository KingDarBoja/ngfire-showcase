import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CompanyActions from './company.actions';
import { CompanyEntity } from './company.models';

export const COMPANY_FEATURE_KEY = 'company';

export interface State extends EntityState<CompanyEntity> {
  selectedId?: string | number; // which Company record has been selected
  loaded: boolean; // has the Company list been loaded
  error?: string | null; // last known error (if any)
}

export interface CompanyPartialState {
  readonly [COMPANY_FEATURE_KEY]: State;
}

export const companyAdapter: EntityAdapter<CompanyEntity> = createEntityAdapter<CompanyEntity>();

export const initialState: State = companyAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const companyReducer = createReducer(
  initialState,
  on(CompanyActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CompanyActions.loadCompanySuccess, (state, { company }) =>
    companyAdapter.setAll(company, { ...state, loaded: true })
  ),
  on(CompanyActions.loadCompanyFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return companyReducer(state, action);
}
