import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { JobPostEntity } from './job-post.models';
import { JobPostEffects } from './job-post.effects';
import { JobPostFacade } from './job-post.facade';

import * as JobPostSelectors from './job-post.selectors';
import * as JobPostActions from './job-post.actions';
import {
  JOB_POST_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './job-post.reducer';

interface TestSchema {
  jobPost: State;
}

describe('JobPostFacade', () => {
  let facade: JobPostFacade;
  let store: Store<TestSchema>;
  const createJobPostEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as JobPostEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(JOB_POST_FEATURE_KEY, reducer),
          EffectsModule.forFeature([JobPostEffects]),
        ],
        providers: [JobPostFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(JobPostFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allJobPost$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allJobPost$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadJobPostSuccess` to manually update list
     */
    it('allJobPost$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allJobPost$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          JobPostActions.loadJobPostSuccess({
            jobPost: [createJobPostEntity('AAA'), createJobPostEntity('BBB')],
          })
        );

        list = await readFirst(facade.allJobPost$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
