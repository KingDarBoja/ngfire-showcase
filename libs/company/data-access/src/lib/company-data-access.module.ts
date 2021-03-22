import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCompany from './+state/company.reducer';
import { CompanyEffects } from './+state/company.effects';
import { CompanyFacade } from './+state/company.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCompany.COMPANY_FEATURE_KEY,
      fromCompany.reducer
    ),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  providers: [CompanyFacade],
})
export class CompanyDataAccessModule {}
