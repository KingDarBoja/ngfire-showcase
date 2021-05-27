import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatDatepickerInput } from '@matheo/datepicker';
import { MatCalendarType } from '@matheo/datepicker/lib/calendar.types';

@Component({
  template: `
    <input
      matInput
      [id]="id"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [matDatepicker]="picker"
      [matDatepickerFilter]="to.datepickerOptions.filter"
      [max]="to.datepickerOptions.max"
      [min]="to.datepickerOptions.min"
      [formlyAttributes]="field"
      [placeholder]="placeholderOpt"
      [tabindex]="to.tabindex"
      [readonly]="to.readonly"
      [required]="requiredOpt"
      (dateInput)="to.datepickerOptions.dateInput(field, $event)"
      (dateChange)="to.datepickerOptions.dateChange(field, $event)"
    />
    <ng-template #datepickerToggle>
      <mat-datepicker-toggle
        [disabled]="to.disabled"
        [for]="picker"
      ></mat-datepicker-toggle>
    </ng-template>
    <mat-datepicker
      #picker
      [type]="type"
      [color]="to.color"
      [dateClass]="to.datepickerOptions.dateClass"
      [disabled]="to.datepickerOptions.disabled"
      [opened]="to.datepickerOptions.opened"
      [panelClass]="to.datepickerOptions.panelClass"
      [startAt]="to.datepickerOptions.startAt"
      [startView]="to.datepickerOptions.startView"
      [touchUi]="to.datepickerOptions.touchUi"
      (monthSelected)="
        to.datepickerOptions.monthSelected(field, $event, picker)
      "
      (yearSelected)="to.datepickerOptions.yearSelected(field, $event, picker)"
    >
      <mat-datepicker-actions>
        <button mat-button matDatepickerCancel>Cancel</button>
        <button mat-raised-button color="primary" matDatepickerApply>
          Apply
        </button>
      </mat-datepicker-actions>
    </mat-datepicker>
  `,
})
export class DatetimeComponent extends FieldType implements AfterViewInit {
  @ViewChild(MatDatepickerInput, { static: true }) datepickerInput!: MatDatepickerInput<Date | number>;
  @ViewChild('datepickerToggle') datepickerToggle!: TemplateRef<HTMLElement>;
  formControl!: FormControl;

  defaultOptions = {
    templateOptions: {
      datepickerOptions: {
        startView: 'month',
        datepickerTogglePosition: 'suffix',
        /* eslint-disable @typescript-eslint/no-empty-function */
        dateInput: () => {},
        dateChange: () => {},
        monthSelected: () => {},
        yearSelected: () => {},
        /* eslint-enable @typescript-eslint/no-empty-function */
      },
    },
  };

  get type(): MatCalendarType {
    return this.to.type as MatCalendarType ?? 'date';
  }

  get requiredOpt() {
    return this.to.required || false;
  }

  get placeholderOpt() {
    return this.to.placeholder || '';
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // temporary fix for https://github.com/angular/material2/issues/6728
    (this.datepickerInput as any)._formField = this.formField;

    setTimeout(() => {
      switch (this.to.datepickerOptions.datepickerTogglePosition) {
        case 'suffix':
          this.to._matSuffix = this.datepickerToggle;
          break;

        case 'prefix':
          this.to._matPrefix = this.datepickerToggle;
          break;
      }

      (this.options as any)._markForCheck(this.field);
    });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
