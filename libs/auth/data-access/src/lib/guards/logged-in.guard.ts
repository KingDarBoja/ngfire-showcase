import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { loadAuthFromApi } from '../+state/auth.actions';
import { isLoggedIn } from '../+state/auth.selectors';
import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  hasAuthInStore(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(take(1));
  }

  hasAuthInApi(): Observable<boolean> {
    return this.authService.authState.pipe(
      tap((authUser) => this.store.dispatch(loadAuthFromApi({ authUser }))),
      map((authUser) => !!authUser),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  hasAuth() {
    return this.hasAuthInStore().pipe(
      switchMap((inStore) => (inStore ? of(inStore) : this.hasAuthInApi()))
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.hasAuth().pipe(
      map((loggedIn) =>
        loggedIn ? true : this.router.createUrlTree(['/login'])
      )
    );
  }
}
