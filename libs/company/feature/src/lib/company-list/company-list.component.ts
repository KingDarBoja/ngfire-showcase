import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CompanyEntity,
  CompanyFacade,
} from '@ngfire-showcase/company/data-access';
import { WebUiTableColumn } from '@ngfire-showcase/web/ui/table';
import { AddCompanyDialogComponent } from './add-company-example/add-company.component';

@Component({
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent {
  allCompanies$ = this.companyFacade.getAllCompanies$;
  cols: WebUiTableColumn<CompanyEntity>[] = [
    {
      field: 'id',
      header: 'Identifier',
    },
    {
      field: 'name',
      header: 'Name',
    },
  ];

  constructor(
    private readonly companyFacade: CompanyFacade,
    private readonly dialog: MatDialog,
  ) {}

  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyDialogComponent, {
      width: '480px',
      data: { name: 'King Company', address: [{}] } as CompanyEntity,
    });
    dialogRef.componentInstance.submitForm.subscribe((res) => {
      console.log('The dialog was closed', res);
    });
  }
}
