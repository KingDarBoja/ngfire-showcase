import { createAction, props } from '@ngrx/store';
import { CompanyEntity } from './company.models';

export const navigatedToCompanies = createAction(
  '[Company Page] Navigate To Companies',
);
export const companiesChanged = createAction(
  '[Company List] Companies Changed',
  props<{ companies: ReadonlyArray<CompanyEntity> }>(),
);
