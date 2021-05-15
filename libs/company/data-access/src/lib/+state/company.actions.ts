import { createAction, props } from '@ngrx/store';
import { CompanyEntity } from '@ngfire-showcase/company/domain';

export const navigatedToCompanies = createAction(
  '[Company Page] Navigate To Companies',
);
export const companiesChanged = createAction(
  '[Company List] Companies Changed',
  props<{ companies: ReadonlyArray<CompanyEntity> }>()
);
