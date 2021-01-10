import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '@ngfire-showcase/shared/ui/forms';

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
    FormField.email('email', { addonLeft: { icon: 'at' }, required: true })
  ];

  submit(value: any): void {
    console.log(value);
  }
}
