import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  navigatedToCompanies,
} from '@ngfire-showcase/company/data-access';

@Injectable()
export class CompanyListResolver implements Resolve<void> {
  constructor(private readonly store: Store) {}

  resolve(): void {
    this.store.dispatch(navigatedToCompanies());
  }
}
