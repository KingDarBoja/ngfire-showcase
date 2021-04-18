import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import {
  AuthErrorCode,
  FirebaseAuthError,
} from '@ngfire-showcase/shared/util/sdk';

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

  /**
   * Perform a call to **AngularFireAuth** `signinwithemailandpassword` method
   * and then get the user data on success and throws an error on failure, where
   * the possible codes are listed below.
   *
   * Read more at: [firebase auth
   * docs](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword).
   *
   * Error Codes
   * - `auth/invalid-email`: Thrown if the email address is not valid.
   * - `auth/user-disabled`: Thrown if the user corresponding to the given email
   *   has been disabled.
   * - `auth/user-not-found`: Thrown if there is no user corresponding to the
   *   given email.
   * - `auth/wrong-password`: Thrown if the password is invalid for the given
   *   email, or the account corresponding to the email does not have a password
   *   set.
   */
  loginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithEmail),
      exhaustMap((action) => this.afAuth.signInWithEmailAndPassword(action.email, action.password)),
      map(() => getUser()),
      catchError((err: FirebaseAuthError) =>
        of(authError({ errorCode: this.normalizeLoginError(err.code) }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private readonly afAuth: AngularFireAuth
  ) {}

  /**
   * Handle the error thrown by `signInWithEmailAndPassword` for those codes that have no possible
   * translation by converting the unknown error to auth/internal-error so it
   * 'appears' generic.
   * @param incomingError the incoming error code
   */
  private normalizeLoginError(incomingError: AuthErrorCode) {
    const knownErrors = [
      AuthErrorCode.INVALID_EMAIL,
      AuthErrorCode.USER_DISABLED,
      AuthErrorCode.USER_DELETED,
      AuthErrorCode.INVALID_PASSWORD,
    ];
    if (!knownErrors.includes(incomingError)) {
      return AuthErrorCode.INTERNAL_ERROR;
    }

    return incomingError;
  }
}
