import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';

import { WebUiFormField } from '@ngfire-showcase/web/ui/form';
import {
  AddressEntity,
  CompanyEntity,
} from '@ngfire-showcase/company/data-access';

@Component({
  template: `
    <h1 mat-dialog-title>Add Company</h1>
    <div mat-dialog-content>
      <ngf-form
        [form]="form"
        [fields]="fields"
        [model]="data"
        (submitForm)="submit($event)"
      >
        <!-- <section class="flex flex-row justify-end space-x-6 mt-6">
          <button
            mat-stroked-button
            color="warn"
            (click)="onCancel()"
            cdkFocusInitial
          >
            Cancel
          </button>
          <button
            mat-flat-button
            color="accent"
            [disabled]="!form.valid"
            type="submit"
          >
            Save
          </button>
        </section> -->
      </ngf-form>
    </div>
  `,
})
export class AddCompanyDialogComponent {
  private readonly _spinner$ = new BehaviorSubject<boolean>(false);
  readonly spinner$ = this._spinner$.asObservable();

  form = new FormGroup({});
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
              'templateOptions.disabled': () => {
                return this.form.invalid;
              },
            },
          },
        ),
      ],
      'flex justify-end gap-6 mt-6',
    ),
  ];
  @Output() submitForm = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: CompanyEntity,
    private readonly dialogRef: MatDialogRef<AddCompanyDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(model: CompanyEntity) {
    console.log(model);
  }
}
