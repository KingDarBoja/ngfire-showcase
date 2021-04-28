import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  authenticated,
  authError,
  loginWithEmail,
  notAuthenticated,
} from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  loginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithEmail),
      exhaustMap((action) =>
        this.authService.signInWithEmailAndPassword(action).pipe(
          map((authUser) =>
            authUser ? authenticated({ authUser }) : notAuthenticated()
          ),
          catchError((error) => of(authError({ errorCode: error.code })))
        )
      )
    )
  );

  navigateToDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticated),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
}
