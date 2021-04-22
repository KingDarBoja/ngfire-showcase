import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'ngf-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  @Input() buttonTitle = '';
  @Input() linkPath: string | null = null;
  @Input() linkTitle = '';
  @Input() error?: string;
  @Input() form = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() pageTitle = '';
  @Output() submitForm = new EventEmitter();
}
