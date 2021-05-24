import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  template: `
    <div
      *ngFor="let field of field.fieldGroup; let i = index"
      class="grid grid-cols-12 gap-4"
    >
      <formly-field class="col-span-10" [field]="field"></formly-field>
      <div class="col-span-2">
        <button mat-mini-fab color="warn" type="button" (click)="remove(i)">
          <mat-icon class="material-icons-outlined">delete_forever</mat-icon>
        </button>
      </div>
    </div>
    <section class="mt-4">
      <button mat-stroked-button color="primary" type="button" (click)="add()">
        {{ to.addText }}
      </button>
    </section>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
