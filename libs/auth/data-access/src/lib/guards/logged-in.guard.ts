import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthPartialState } from '../+state/auth.reducer';
import { isLoggedIn } from '../+state/auth.selectors';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly store: Store<AuthPartialState>,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(isLoggedIn),
      map((loggedIn) =>
        loggedIn ? true : this.router.createUrlTree(['/login'])
      )
    );
  }
}
