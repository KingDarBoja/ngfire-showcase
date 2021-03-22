import { createAction, props } from '@ngrx/store';
import { CompanyEntity } from './company.models';

export const init = createAction('[Company Page] Init');

export const loadCompanySuccess = createAction(
  '[Company/API] Load Company Success',
  props<{ company: CompanyEntity[] }>()
);

export const loadCompanyFailure = createAction(
  '[Company/API] Load Company Failure',
  props<{ error: any }>()
);
