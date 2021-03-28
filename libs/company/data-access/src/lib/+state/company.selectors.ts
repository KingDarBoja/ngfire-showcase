import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMPANY_FEATURE_KEY,
  State,
  CompanyPartialState,
} from './company.reducer';

// Lookup the 'Company' feature state managed by NgRx
export const getCompanyState = createFeatureSelector<
  CompanyPartialState,
  State
>(COMPANY_FEATURE_KEY);

export const getAllCompanies = createSelector(
  getCompanyState,
  (state: State) => state.companies
);
