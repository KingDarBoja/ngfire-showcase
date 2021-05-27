import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState, COMPANY_FEATURE_KEY } from './company.reducer';

// Lookup the 'Company' feature state managed by NgRx
export const getCompanyState = createFeatureSelector<CompanyState>(
  COMPANY_FEATURE_KEY,
);

export const getAllCompanies = createSelector(
  getCompanyState,
  (state: CompanyState) => state.companies,
);
