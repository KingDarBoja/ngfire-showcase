import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: TranslocoHttpLoader,
};
