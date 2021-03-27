import { JobPostEntity } from './job-post.models';
import { State, jobPostAdapter, initialState } from './job-post.reducer';
import * as JobPostSelectors from './job-post.selectors';

describe('JobPost Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getJobPostId = (it) => it['id'];
  const createJobPostEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as JobPostEntity);

  let state;

  beforeEach(() => {
    state = {
      jobPost: jobPostAdapter.setAll(
        [
          createJobPostEntity('PRODUCT-AAA'),
          createJobPostEntity('PRODUCT-BBB'),
          createJobPostEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('JobPost Selectors', () => {
    it('getAllJobPost() should return the list of JobPost', () => {
      const results = JobPostSelectors.getAllJobPost(state);
      const selId = getJobPostId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = JobPostSelectors.getSelected(state);
      const selId = getJobPostId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getJobPostLoaded() should return the current 'loaded' status", () => {
      const result = JobPostSelectors.getJobPostLoaded(state);

      expect(result).toBe(true);
    });

    it("getJobPostError() should return the current 'error' state", () => {
      const result = JobPostSelectors.getJobPostError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
