import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AUTH_FEATURE_KEY, reducer } from './+state/auth.reducer';
import { AuthFacade } from './+state/auth.facade';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade, AuthService, LoggedInGuard],
})
export class AuthDataAccessModule {}
