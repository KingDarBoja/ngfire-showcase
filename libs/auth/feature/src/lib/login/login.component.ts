import { Component } from '@angular/core';
import { AuthFacade, AuthLoginInput } from '@ngfire-showcase/auth/data-access';
import { WebUiFormField } from '@ngfire-showcase/web/ui/form';

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
}
