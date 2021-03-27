import { Injectable } from '@angular/core';
import { FirestoreService } from '@ngfire-showcase/shared/util/sdk';
import { CompanyEntity } from '..';

@Injectable({ providedIn: 'root' })
export class CompanyFirestoreService extends FirestoreService<CompanyEntity> {
  protected basePath = 'company';
}
