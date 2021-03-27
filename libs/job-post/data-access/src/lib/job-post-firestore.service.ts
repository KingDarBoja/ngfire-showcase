import { Injectable } from '@angular/core';
import { FirestoreService } from '@ngfire-showcase/shared/util/sdk';
import { JobPostEntity } from '..';

@Injectable({ providedIn: 'root' })
export class JobPostFirestoreService extends FirestoreService<JobPostEntity> {
  protected basePath = 'job-post';
}
