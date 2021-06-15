import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { WebUiFormField } from '@ngfire-showcase/web/ui/form';
import {
  AddressEntity,
  CompanyEntity,
} from '@ngfire-showcase/company/data-access';

type AddCompanyDialogOptions = Omit<FormlyFormOptions, 'formState'> & {
  formState: {
    spinner: boolean;
  };
};

@Component({
  template: `
    <h1 mat-dialog-title>Add Company</h1>
    <div mat-dialog-content>
      <ngf-form
        [form]="form"
        [fields]="fields"
        [model]="data"
        [options]="options"
        (submitForm)="submit($event)"
      >
        <ng-container *ngIf="options.formState.spinner">
          <section class="flex justify-center mt-6">
            <mat-spinner diameter="24"></mat-spinner>
          </section>
        </ng-container>
      </ngf-form>
    </div>
  `,
})
export class AddCompanyDialogComponent {
  form = new FormGroup({});
  options: AddCompanyDialogOptions = {
    formState: {
      spinner: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    WebUiFormField.input<CompanyEntity>('name', {
      label: 'Name',
      required: true,
    }),
    WebUiFormField.datetime('creation', {
      label: 'Creation Datetime',
      required: true,
    }),
    {
      key: 'address',
      type: 'repeat',
      templateOptions: {
        addText: 'Add another address',
      },
      fieldArray: {
        fieldGroup: [
          WebUiFormField.input<AddressEntity>('state', {
            label: 'State',
            required: true,
          }),
          WebUiFormField.input<AddressEntity>('district', {
            label: 'District',
            required: true,
          }),
        ],
      },
    },
    WebUiFormField.fieldRow(
      [
        WebUiFormField.button({
          text: 'Cancel',
          color: 'warn',
          autofocus: true,
          onClick: () => this.dialogRef.close(),
          btnType: 'stroked',
        }),
        WebUiFormField.button(
          {
            text: 'Save',
            type: 'submit',
            color: 'accent',
            btnType: 'flat',
          },
          {
            expressionProperties: {
              'templateOptions.disabled': () => this.form.invalid,
            },
          },
        ),
      ],
      'flex justify-end gap-6 mt-6',
      {
        hideExpression: (
          model: CompanyEntity,
          formState: AddCompanyDialogOptions['formState'],
        ) => formState.spinner,
      },
    ),
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: CompanyEntity,
    private readonly dialogRef: MatDialogRef<AddCompanyDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(model: CompanyEntity) {
    console.log(model);
    this.options.formState.spinner = true;
  }
}
