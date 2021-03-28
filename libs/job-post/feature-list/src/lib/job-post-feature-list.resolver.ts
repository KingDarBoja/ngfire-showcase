import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  JobPostPartialState,
  companyChanged,
} from '@ngfire-showcase/job-post/data-access';

@Injectable()
export class JobPostFeatureListResolver implements Resolve<void> {
  constructor(private store: Store<JobPostPartialState>) {}

  resolve({ queryParamMap }: ActivatedRouteSnapshot): void {
    const companyId = queryParamMap.get('companyId') ?? undefined;
    this.store.dispatch(companyChanged({ companyId: companyId }));
  }
}
