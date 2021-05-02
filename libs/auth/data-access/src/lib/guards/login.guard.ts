import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { loadAuthFromApi } from '../+state/auth.actions';
import { AuthPartialState } from '../+state/auth.reducer';
import { isLoggedIn } from '../+state/auth.selectors';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly store: Store<AuthPartialState>,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  hasAuthInStore(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      map((loggedIn) => loggedIn),
      take(1)
    );
  }

  hasAuthInApi(): Observable<boolean> {
    return this.authService.authState.pipe(
      tap((authUser) => this.store.dispatch(loadAuthFromApi({ authUser }))),
      map((authUser) => !!authUser),
      catchError(() => of(true))
    );
  }

  hasAuth() {
    return this.hasAuthInStore().pipe(
      switchMap((inStore) => (inStore ? of(inStore) : this.hasAuthInApi()))
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.hasAuth().pipe(
      map((loggedIn) => (loggedIn ? this.router.createUrlTree(['/']) : true))
    );
  }
}