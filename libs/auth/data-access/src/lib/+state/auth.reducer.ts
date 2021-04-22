import { createReducer, on, Action } from '@ngrx/store';
import { authenticated, authError, notAuthenticated } from './auth.actions';
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
  on(authenticated, (state, { authUser }) => ({
    ...state,
    authUser,
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
