import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AUTH_FEATURE_KEY, reducer } from './+state/auth.reducer';
import { AuthFacade } from './+state/auth.facade';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade, AuthService, LoginGuard, LoggedInGuard],
})
export class AuthDataAccessModule {}
