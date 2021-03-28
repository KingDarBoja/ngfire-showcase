/**
 * Interface for the 'JobPost' data
 */
export interface JobPostEntity {
  id: string; // Primary ID
  companyId: string;
  countryId: string;
  title: string;
}

/**
 * Perform a search based on the job post company, country or user search.
 */
export interface JobSearchParams {
  readonly companyId?: string;
  readonly countryId?: string;
  readonly query?: string;
}
