import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  CompanyPartialState,
  navigatedToCompanies,
} from '@ngfire-showcase/company/data-access';

@Injectable()
export class CompanyListResolver implements Resolve<void> {
  constructor(private store: Store<CompanyPartialState>) {}

  resolve(): void {
    this.store.dispatch(navigatedToCompanies());
  }
}
