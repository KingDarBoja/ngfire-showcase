import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CompanyEntity } from './company.models';
import { CompanyEffects } from './company.effects';
import { CompanyFacade } from './company.facade';

import * as CompanySelectors from './company.selectors';
import * as CompanyActions from './company.actions';
import {
  COMPANY_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './company.reducer';

interface TestSchema {
  company: State;
}

describe('CompanyFacade', () => {
  let facade: CompanyFacade;
  let store: Store<TestSchema>;
  const createCompanyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CompanyEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMPANY_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CompanyEffects]),
        ],
        providers: [CompanyFacade],
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
      facade = TestBed.inject(CompanyFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCompany$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allCompany$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCompanySuccess` to manually update list
     */
    it('allCompany$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCompany$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          CompanyActions.loadCompanySuccess({
            company: [createCompanyEntity('AAA'), createCompanyEntity('BBB')],
          })
        );

        list = await readFirst(facade.allCompany$);
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
