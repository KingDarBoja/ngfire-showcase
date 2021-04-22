/**
 * Interface for the 'Auth' data. These fields come from `firebase.UserInfo`.
 */
export interface AuthUserEntity {
  /** The user's unique ID. Primary ID. */
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
}
