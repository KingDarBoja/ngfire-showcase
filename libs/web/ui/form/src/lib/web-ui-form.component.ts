import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormBuilder,
  FormlyFormOptions,
} from '@ngx-formly/core';

@Component({
  selector: 'ngf-form',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="submit()">
      <div>
        <formly-form
          [form]="form"
          [fields]="fields"
          [model]="model"
          [options]="options"
        ></formly-form>
        <button
          type="submit"
          style="display: none;"
          [disabled]="form.touched && !form.valid"
        ></button>
      </div>
      <ng-content></ng-content>
    </form>
  `,
})
export class WebUiFormComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() model: any = {};
  @Input() options: FormlyFormOptions = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() submitForm = new EventEmitter<any>();

  constructor(private builder: FormlyFormBuilder) {}

  ngOnInit(): void {
    this.builder.buildForm(this.form, this.fields, this.model, this.options);
  }

  submit(): void {
    this.submitForm.emit({ ...this.model });
  }
}
