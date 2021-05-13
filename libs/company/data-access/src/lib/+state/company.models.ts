export interface AddressEntity {
  country: string; // Use a enum here.
  /** State / Province / Region */
  state: string;
  /** County / District / Municipalities */
  district: string; // Optional
  /** City / Town */
  city: string;
  /** Postal code */
  zip: string;
  /** Firebase GeoPoint **/
  // geo: {
  //   lat: firestore.GeoPoint // number
  //   lon: firestore.GeoPoint // number
  // }
}

/**
 * Interface for the 'Company' data.
 *
 * The address field is based on https://stackoverflow.com/questions/310540/best-practices-for-storing-postal-addresses-in-a-database-rdbms
 */
export interface CompanyEntity {
  id: string; // Primary ID
  name: string;
  address: AddressEntity[];
}
