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
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="model"
        [options]="options"
      ></formly-form>
    </form>
  `,
})
export class WebUiFormComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: Record<string, unknown> = {};
  @Input() options: FormlyFormOptions = {};
  @Output() submitForm = new EventEmitter<Record<string, unknown>>();

  constructor(private builder: FormlyFormBuilder) {}

  ngOnInit(): void {
    this.builder.buildForm(this.form, this.fields, this.model, this.options);
  }

  submit(): void {
    this.submitForm.emit({ ...this.model });
  }
}
