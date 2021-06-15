import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <div>
      <ng-container [ngSwitch]="to.btnType">
        <button
          *ngSwitchDefault
          mat-button
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'raised'"
          mat-raised-button
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'stroked'"
          mat-stroked-button
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'flat'"
          mat-flat-button
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'icon'"
          mat-icon-button
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'fab'"
          mat-fab
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
        <button
          *ngSwitchCase="'mini-fab'"
          mat-mini-fab
          [attr.cdkFocusInitial]="to.autofocus"
          [color]="to.color"
          [type]="to.type"
          [disabled]="to.disabled"
          (click)="onClick($event)"
        >
          {{ to.text | uppercase }}
        </button>
      </ng-container>
    </div>
  `,
})
export class ButtonTypeComponent extends FieldType {
  onClick($event: unknown) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }
}
