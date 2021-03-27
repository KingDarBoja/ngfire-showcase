import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { JobPostEffects } from './job-post.effects';
import * as JobPostActions from './job-post.actions';

describe('JobPostEffects', () => {
  let actions: Observable<any>;
  let effects: JobPostEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        JobPostEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(JobPostEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: JobPostActions.init() });

      const expected = hot('-a-|', {
        a: JobPostActions.loadJobPostSuccess({ jobPost: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
