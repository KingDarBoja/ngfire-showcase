import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AuthErrorCode,
  FirebaseAuthError,
} from '@ngfire-showcase/shared/util/sdk';
import type { AuthUserCredential } from '@ngfire-showcase/shared/util/sdk';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUserEntity } from '..';

@Injectable()
export class AuthService {
  constructor(private readonly afAuth: AngularFireAuth) {}

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
  signInWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<AuthUserEntity | null> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(({ user }: AuthUserCredential) =>
        user
          ? {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              providerId: user.providerId,
            }
          : null
      ),
      catchError((err: FirebaseAuthError) =>
        throwError(new FirebaseAuthError(this.normalizeLoginError(err.code), err.message))
      )
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  /**
   * Handle the error thrown by `signInWithEmailAndPassword` for those codes that have no possible
   * translation by converting the unknown error to auth/internal-error so it
   * 'appears' generic.
   * @param incomingError the incoming error code
   */
  private normalizeLoginError(incomingError: AuthErrorCode): AuthErrorCode {
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
