import { Component } from '@angular/core';
import { AuthErrorCode } from '@ngfire-showcase/shared/util/sdk';
import { AuthFacade, AuthLoginInput } from '@ngfire-showcase/auth/data-access';
import { WebUiFormField } from '@ngfire-showcase/web/ui/form';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngfire-showcase-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly vm$ = this.authFacade.getAuthState$;
  readonly fields = [
    WebUiFormField.email<AuthLoginInput>('email', { label: 'Email', required: true }),
    WebUiFormField.password<AuthLoginInput>('password', { label: 'Password', required: true }),
  ];

  constructor(private readonly authFacade: AuthFacade) {}

  submit(input: AuthLoginInput) {
    this.authFacade.loginWithEmail(input);
  }

  /**
   * Map the auth error code thrown by **AngularFireAuth**
   * `signinwithemailandpassword` method into a localized message key.
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
   * @param errorCode auth error code
   */
  private loginErrorMap(errorCode: string): string {
    switch (errorCode) {
      case AuthErrorCode.INVALID_EMAIL:
        return 'login.invalid_email';
      case AuthErrorCode.USER_DISABLED:
        return 'login.user_disabled';
      case AuthErrorCode.USER_DELETED:
        return 'login.user_deleted';
      case AuthErrorCode.INVALID_PASSWORD:
        return '';
      default:
        return '';
    }
  }
}
