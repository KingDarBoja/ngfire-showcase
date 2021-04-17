import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';

import {
  authenticated,
  authError,
  getUser,
  loginWithEmail,
  notAuthenticated,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  /** Kinda similar to angularfire auth guard `loggedIn` */
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      exhaustMap(() =>
        this.afAuth.user.pipe(
          take(1),
          map((auth) => {
            if (auth) {
              return authenticated({ auth });
            }
            return notAuthenticated();
          })
        )
      )
    )
  );

  loginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithEmail),
      exhaustMap((action) =>
        defer(() =>
          this.afAuth.signInWithEmailAndPassword(action.email, action.password)
        )
      ),
      map(() => getUser()),
      catchError((err) => of(authError({ errorCode: err.code })))
    )
  );

  constructor(
    private actions$: Actions,
    private readonly afAuth: AngularFireAuth
  ) {}
}
