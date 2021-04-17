import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { loginWithEmail } from './auth.actions';
import { AuthPartialState } from './auth.reducer';
import { getAuthState, getAuthUser } from './auth.selectors';

export interface AuthLoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  getAuthState$ = this.store.select(getAuthState);
  getAuthUser$ = this.store.select(getAuthUser);

  constructor(private store: Store<AuthPartialState>) {}

  loginWithEmail({ email, password }: AuthLoginInput) {
    this.store.dispatch(loginWithEmail({ email, password }));
  }
}
