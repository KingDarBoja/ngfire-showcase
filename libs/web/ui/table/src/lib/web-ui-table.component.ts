import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WebUiTableColumn, WebUiTableConfig } from './web-ui-table.interfaces';
import * as lodash from 'lodash';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'ngfire-showcase-table',
  template: `
    <mat-table [dataSource]="dataSource">
      <ng-container *ngFor="let col of cols" [matColumnDef]="col.field">
        <mat-header-cell *matHeaderCellDef [class]="col?.headerClassName">
          {{ col.header }}
        </mat-header-cell>
        <mat-cell
          *matCellDef="let cell; dataSource: dataSource"
          [class]="col?.className"
        >
          {{ columnValue(cell, col) }}
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
      <mat-row
        *matRowDef="let row; columns: columns"
        [ngStyle]="{ 'mat-row-selected': selectedRows.indexOf(row) !== -1 }"
        (click)="toggleRowSelection(row)"
      ></mat-row>
    </mat-table>
  `,
})
export class WebUiTableComponent<T = unknown> {
  /** Raw columns definition */
  @Input() cols: WebUiTableColumn<T>[] = [];
  @Input() data: ReadonlyArray<T> = [];
  @Input() set config(newConfig: WebUiTableConfig) {
    this._config = {
      ...this._defaultConfig,
      ...newConfig,
    };
  }

  private _config: WebUiTableConfig = {} as WebUiTableConfig;
  private _defaultConfig: WebUiTableConfig = {
    allowMultiSelect: true,
    initialSelection: [],
  };
  private _selection = new SelectionModel<T>(
    this._config.allowMultiSelect,
    this._config.initialSelection,
  );

  get dataSource(): MatTableDataSource<T> {
    return new MatTableDataSource(this.data as T[]);
  }

  /** Get columns to be displayed. */
  get columns() {
    return this.cols?.filter((c) => !c.hide).map((c) => c.field);
  }

  get selectedRows() {
    return this._selection.selected;
  }

  columnValue = (cell: T, col: WebUiTableColumn<T>) =>
    lodash.get(cell, col.field);

  /** Toggle row selection */
  toggleRowSelection(row: T) {
    console.log(row);
    this._selection.toggle(row);
  }
}
