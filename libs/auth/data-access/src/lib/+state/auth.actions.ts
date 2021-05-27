import { createAction, props } from '@ngrx/store';
import { AuthUserEntity } from './auth.models';

export const authError = createAction(
  '[Auth] Error',
  props<{ errorCode: string }>(),
);
export const loginWithEmail = createAction(
  '[Auth] Login With Email',
  props<{ email: string; password: string }>(),
);
export const loadAuthFromApi = createAction(
  '[Auth] Load Auth From API',
  props<{ authUser: AuthUserEntity | null }>(),
);
export const loginSuccess = createAction(
  '[Auth] Authenticated',
  props<{ authUser: AuthUserEntity }>(),
);
export const loginFailure = createAction('[Auth] Not Authenticated');
export const confirmLogout = createAction('[Auth] Confirm Logout');
export const logoutConfirmed = createAction('[Auth] Logout Confirmed');
export const logoutCancelled = createAction('[Auth] Logout Cancelled');
