import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isLoggedIn = createSelector(
  getAuthState,
  (state) => !!state.authUser
);

export const getAuthUser = createSelector(
  getAuthState,
  (state: AuthState) => state.authUser
);
