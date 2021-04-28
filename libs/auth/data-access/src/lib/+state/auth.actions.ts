import { createAction, props } from '@ngrx/store';
import { AuthUserEntity } from './auth.models';

export const loginWithEmail = createAction(
  '[Auth] Login With Email',
  props<{ email: string; password: string }>()
);
export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ authUser: AuthUserEntity }>()
);
export const notAuthenticated = createAction('[Auth] Not Authenticated');
export const authError = createAction(
  '[Auth] Error',
  props<{ errorCode: string }>()
);
