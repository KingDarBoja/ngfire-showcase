import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';

/**
 * All these fields are needed in order to keep the corretc behaviour ofthe
 * input with the ngx-mask options (prefix, suffix, mask, etc).
 */
@Component({
  template: `
    <input
      matInput
      [mask]="mask"
      [prefix]="prefix"
      [id]="id"
      [type]="type"
      [readonly]="to.readonly"
      [required]="requiredOpt"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="to.tabindex"
      [placeholder]="placeholderOpt"
    />
  `,
})
export class PhoneTypeComponent extends FieldType {
  @ViewChild(MatInput) formFieldControl!: MatInput;
  formControl!: FormControl;

  get type() {
    return this.to.type || 'text';
  }

  get mask() {
    return this.to.mask || '(000) 000-0000';
  }

  get prefix() {
    return this.to.prefix || '';
  }

  get requiredOpt() {
    return this.to.required || false;
  }

  get placeholderOpt() {
    return this.to.placeholder || '';
  }
}
