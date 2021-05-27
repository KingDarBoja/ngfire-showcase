import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

/**
 * Provides strong typing on cell templates.
 *
 * Based on the linked [issue comment](https://github.com/angular/components/issues/22290#issuecomment-802981442)
 * at angular/components repository.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matCellDef]', // same selector as MatCellDef
  providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDefDirective }],
})
export class TypeSafeMatCellDefDirective<T> extends MatCellDef {
  @Input() matCellDefDataSource!: T[] | Observable<T[]> | MatTableDataSource<T>;

  static ngTemplateContextGuard<T>(
    dir: TypeSafeMatCellDefDirective<T>,
    ctx: unknown,
  ): ctx is { $implicit: T; index: number } {
    return true;
  }
}
