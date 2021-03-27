import { Component } from '@angular/core';
import {
  CompanyEntity,
  CompanyFacade,
} from '@ngfire-showcase/company/data-access';
import { WebUiTableColumn } from '@ngfire-showcase/web/ui/table';

@Component({
  selector: 'ngfire-showcase-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent {
  allCompany$ = this.companyFacade.allCompany$;
  selectedCompany$ = this.companyFacade.selectedCompany$;
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

  constructor(private readonly companyFacade: CompanyFacade) {
    this.companyFacade.init();
  }
}
