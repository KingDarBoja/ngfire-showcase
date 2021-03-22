import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMPANY_FEATURE_KEY,
  State,
  CompanyPartialState,
  companyAdapter,
} from './company.reducer';

// Lookup the 'Company' feature state managed by NgRx
export const getCompanyState = createFeatureSelector<
  CompanyPartialState,
  State
>(COMPANY_FEATURE_KEY);

const { selectAll, selectEntities } = companyAdapter.getSelectors();

export const getCompanyLoaded = createSelector(
  getCompanyState,
  (state: State) => state.loaded
);

export const getCompanyError = createSelector(
  getCompanyState,
  (state: State) => state.error
);

export const getAllCompany = createSelector(getCompanyState, (state: State) =>
  selectAll(state)
);

export const getCompanyEntities = createSelector(
  getCompanyState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCompanyState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCompanyEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
