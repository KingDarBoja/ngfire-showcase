import { CompanyEntity } from './company.models';
import * as CompanyActions from './company.actions';
import { State, initialState, reducer } from './company.reducer';
import { Action } from '@ngrx/store';

describe('Company Reducer', () => {
  const createCompanyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CompanyEntity);

  // beforeEach(() => {});

  describe('valid Company actions', () => {
    it('loadCompanySuccess should return set the list of known Company', () => {
      const company = [
        createCompanyEntity('PRODUCT-AAA'),
        createCompanyEntity('PRODUCT-zzz'),
      ];
      const action = CompanyActions.loadCompanySuccess({ company });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
