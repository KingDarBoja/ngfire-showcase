/* eslint-disable max-len */
import { AuthErrorCode } from './auth-error-codes';

/**
 * Copy of the FirebaseError method that I cannot find where it is exported in the code.
 *
 * - [ES6_Custom_Error_Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES6_Custom_Error_Class)
 * - [TS Extending Built-ins](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
 * - [Firebase-JS-SDK Index](https://github.com/firebase/firebase-js-sdk/blob/0c602aa0a6ecd11c63f9efd49e82d2226dfcaf54/packages/firebase/index.d.ts#L40)
 * - [Firebase-JS-SDK Errors](https://github.com/firebase/firebase-js-sdk/blob/0c602aa0a6ecd11c63f9efd49e82d2226dfcaf54/packages/util/src/errors.ts#L74)
 */
export class FirebaseAuthError extends Error {
  readonly name: string = 'FirebaseAuthError';

  constructor(
    readonly code: AuthErrorCode,
    readonly message: string,
    readonly customData?: Record<string, unknown>,
  ) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FirebaseAuthError.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    // Error.captureStackTrace(this, FirebaseAuthError);
    this.stack = new Error().stack;
  }
}
