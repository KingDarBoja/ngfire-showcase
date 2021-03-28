import { Component } from '@angular/core';
import {
  CompanyEntity,
  CompanyFacade,
} from '@ngfire-showcase/company/data-access';
import { WebUiTableColumn } from '@ngfire-showcase/web/ui/table';

@Component({
  templateUrl: './company-feature-list.component.html',
})
export class CompanyFeatureListComponent {
  allCompanies$ = this.companyFacade.getAllCompanies$;
  cols: WebUiTableColumn<CompanyEntity>[] = [
    {
      id: 'id',
      header: 'Identifier',
    },
    {
      id: 'name',
      header: 'Name',
    },
  ];

  constructor(private readonly companyFacade: CompanyFacade) {}
}
