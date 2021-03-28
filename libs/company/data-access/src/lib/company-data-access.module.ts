import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './+state/company.effects';
import { CompanyFacade } from './+state/company.facade';
import { COMPANY_FEATURE_KEY, reducer } from './+state/company.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(COMPANY_FEATURE_KEY, reducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  providers: [CompanyFacade],
})
export class CompanyDataAccessModule {}
