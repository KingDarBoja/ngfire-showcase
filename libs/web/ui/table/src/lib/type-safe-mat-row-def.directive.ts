import { CdkRowDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatRowDef, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

/**
 * Provides strong typing on row templates.
 *
 * Based on the linked [issue comment](https://github.com/angular/components/issues/22290#issuecomment-802981442)
 * at angular/components repository.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matRowDef]', // same selector as matRowDef
  providers: [{ provide: CdkRowDef, useExisting: TypeSafeMatRowDefDirective }],
})
export class TypeSafeMatRowDefDirective<T> extends MatRowDef<T> {
  @Input() matRowDefDataSource!: T[] | Observable<T[]> | MatTableDataSource<T>;

  static ngTemplateContextGuard<T>(
    dir: TypeSafeMatRowDefDirective<T>,
    ctx: unknown
  ): ctx is { $implicit: T; index: number } {
    return true;
  }
}
