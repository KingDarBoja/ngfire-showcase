import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngrx/store';
import { companyChanged } from '@ngfire-showcase/job-post/data-access';

@Injectable()
export class JobPostListResolver implements Resolve<void> {
  constructor(private readonly store: Store) {}

  resolve({ queryParamMap }: ActivatedRouteSnapshot): void {
    const companyId = queryParamMap.get('companyId') ?? undefined;
    this.store.dispatch(companyChanged({ companyId: companyId }));
  }
}
