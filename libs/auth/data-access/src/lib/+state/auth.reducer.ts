import { createReducer, on, Action } from '@ngrx/store';
import { authenticated, authError, notAuthenticated } from './auth.actions';
import { AuthEntity } from './auth.models';
// import firebase from 'firebase/app';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  readonly auth: AuthEntity | null;
  // error: firebase.auth.Error | null,
  errorCode: string | null,
  loading: boolean;
  success: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  auth: null,
  // error: null,
  errorCode: null,
  loading: true,
  success: false,
};

const authReducer = createReducer(
  initialState,
  on(authenticated, (state, { auth }) => ({
    ...state,
    auth,
    loading: false,
    success: true,
  })),
  on(notAuthenticated, (state) => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(authError, (state, { errorCode }) => ({
    ...state,
    loading: false,
    success: false,
    errorCode,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
