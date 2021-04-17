import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthPartialState, AUTH_FEATURE_KEY, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<
  AuthPartialState,
  State
>(AUTH_FEATURE_KEY);

export const isLoggedIn = createSelector(
  getAuthState,
  (state) => !!state.auth,
)

export const getAuthUser = createSelector(
  getAuthState,
  (state: State) => state.auth,
)
