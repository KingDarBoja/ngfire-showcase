import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  authError,
  confirmLogout,
  loginFailure,
  loginSuccess,
  loginWithEmail,
  logoutConfirmed,
} from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  loginWithEmail$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(loginWithEmail),
      exhaustMap((action) =>
        this.authService.signInWithEmailAndPassword(action).pipe(
          map((authUser) =>
            authUser ? loginSuccess({ authUser }) : loginFailure(),
          ),
          catchError((error) => of(authError({ errorCode: error.code }))),
        ),
      ),
    ) },
  );

  confirmLogout$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(confirmLogout),
      exhaustMap(() =>
        this.authService.signOut().pipe(
          map(() => logoutConfirmed()),
          catchError((error) => of(authError({ errorCode: error.code }))),
        ),
      ),
    ) },
  );

  navigateToDashboard$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigateByUrl('/')),
      ) },
    { dispatch: false },
  );

  navigateToLogin$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(logoutConfirmed),
        tap(() => this.router.navigateByUrl('/login')),
      ) },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}
}
