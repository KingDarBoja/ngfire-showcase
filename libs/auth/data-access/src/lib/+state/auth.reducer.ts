import { createReducer, on, Action } from '@ngrx/store';
import { authError, loginFailure, loginSuccess, logoutConfirmed } from './auth.actions';
import { AuthUserEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  authUser?: AuthUserEntity;
  // error: firebase.auth.Error | null,
  errorCode?: string,
  loading: boolean;
  success: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  authUser: undefined,
  // error: null,
  errorCode: undefined,
  loading: true,
  success: false,
};

const authReducer = createReducer(
  initialState,
  on(authError, (state, { errorCode }) => ({
    ...state,
    loading: false,
    success: false,
    errorCode,
  })),
  on(loginSuccess, (state, { authUser }) => ({
    ...state,
    authUser,
    errorCode: undefined,
    loading: false,
    success: true,
  })),
  on(loginFailure, (state) => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(logoutConfirmed, () => ({
    ...initialState,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
