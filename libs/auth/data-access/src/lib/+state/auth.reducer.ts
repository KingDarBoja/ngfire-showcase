import { createReducer, on, Action } from '@ngrx/store';
import { authError, loadAuthFromApi, loginFailure, loginSuccess, logoutConfirmed } from './auth.actions';
import { AuthUserEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authUser?: AuthUserEntity;
  // error: firebase.auth.Error | null,
  errorCode?: string,
  loading: boolean;
  success: boolean;
}

export const initialState: AuthState = {
  // set initial required properties
  authUser: undefined,
  // error: null,
  errorCode: undefined,
  loading: true,
  success: false,
};

const authReducer = createReducer(
  initialState,
  on(authError, (state, { errorCode }): AuthState => ({
    ...state,
    loading: false,
    success: false,
    errorCode,
  })),
  on(loadAuthFromApi, (state, { authUser }): AuthState => ({
    ...state,
    authUser: authUser ?? undefined,
  })),
  on(loginSuccess, (state, { authUser }): AuthState => ({
    ...state,
    authUser,
    errorCode: undefined,
    loading: false,
    success: true,
  })),
  on(loginFailure, (state): AuthState => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(logoutConfirmed, (): AuthState => ({
    ...initialState,
  })),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
