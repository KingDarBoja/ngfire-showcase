import { Component } from '@angular/core';
import {
  CompanyEntity,
  CompanyFacade,
} from '@ngfire-showcase/company/data-access';
import { WebUiTableColumn } from '@ngfire-showcase/web/ui/table';

@Component({
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent {
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
