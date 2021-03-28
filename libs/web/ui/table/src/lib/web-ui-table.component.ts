import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WebUiTableColumn } from './web-ui-table.interfaces';

@Component({
  selector: 'ngfire-showcase-table',
  template: `
    <mat-table [dataSource]="dataSource">
      <ng-container *ngFor="let col of cols" [matColumnDef]="col.id">
        <mat-header-cell *matHeaderCellDef [class]="col?.headerClassName">
          {{ col.header }}
        </mat-header-cell>
        <mat-cell *matCellDef="let element; dataSource: dataSource" [class]="col?.className">
          {{ element[col.id] }}
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: columns"></mat-row>
    </mat-table>
  `,
})
export class WebUiTableComponent<T = unknown> {
  /** Raw columns definition */
  @Input() cols: WebUiTableColumn<T>[] = [];
  @Input() data: ReadonlyArray<T> = [];

  get dataSource(): MatTableDataSource<T> {
    return new MatTableDataSource(this.data as T[]);
  }

  /** Get columns to be displayed. */
  get columns() {
    return this.cols?.filter((c) => !c.hide).map((c) => c.id);
  }
}
