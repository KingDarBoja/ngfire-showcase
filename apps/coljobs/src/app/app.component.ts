import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '@ngfire-showcase/shared/ui/forms';

type UserAuth = {
  email: string;
  password: string;
}

@Component({
  selector: 'ngfire-showcase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'coljobs';
  model = {
    email: '',
    password: '',
  };
  form = new FormGroup({});
  fields: FormField[] = [
    FormField.email<UserAuth>('email', { addonLeft: { icon: 'at' }, required: true })
  ];

  submit(value: FormGroup['value']): void {
    console.log(value);
  }
}
