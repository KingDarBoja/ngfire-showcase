import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CompanyEffects } from './company.effects';
import * as CompanyActions from './company.actions';

describe('CompanyEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions: Observable<any>;
  let effects: CompanyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CompanyEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CompanyEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CompanyActions.init() });

      const expected = hot('-a-|', {
        a: CompanyActions.loadCompanySuccess({ company: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
