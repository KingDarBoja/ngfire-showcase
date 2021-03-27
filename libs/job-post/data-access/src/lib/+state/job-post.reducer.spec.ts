import { JobPostEntity } from './job-post.models';
import * as JobPostActions from './job-post.actions';
import { State, initialState, reducer } from './job-post.reducer';

describe('JobPost Reducer', () => {
  const createJobPostEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as JobPostEntity);

  beforeEach(() => {});

  describe('valid JobPost actions', () => {
    it('loadJobPostSuccess should return set the list of known JobPost', () => {
      const jobPost = [
        createJobPostEntity('PRODUCT-AAA'),
        createJobPostEntity('PRODUCT-zzz'),
      ];
      const action = JobPostActions.loadJobPostSuccess({ jobPost });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
