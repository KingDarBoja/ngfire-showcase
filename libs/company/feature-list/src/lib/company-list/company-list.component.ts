import { Component } from '@angular/core';
import { CompanyFacade } from '@ngfire-showcase/company/data-access';

@Component({
  selector: 'ngfire-showcase-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  allCompany$ = this.companyFacade.allCompany$;
  selectedCompany$ = this.companyFacade.selectedCompany$;

  constructor(private readonly companyFacade: CompanyFacade) {}
}
