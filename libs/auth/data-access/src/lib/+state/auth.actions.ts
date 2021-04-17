import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const loginWithEmail = createAction(
  '[Auth] Login With Email',
  props<{ email: string; password: string }>()
);
export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ auth: AuthEntity }>()
);
export const notAuthenticated = createAction('[Auth] Not Authenticated');
export const authError = createAction(
  '[Auth] Error',
  props<{ errorCode: string }>()
);
export const getUser = createAction('[Auth] Get User');
