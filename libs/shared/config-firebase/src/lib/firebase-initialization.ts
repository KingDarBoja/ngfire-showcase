/**
 * Enable Firebase Auth Emulator to keep credentials on refresh.
 *
 * Work around for https://github.com/firebase/firebase-js-sdk/issues/4110
 *
 * Quote from Firebase-js-sdk comment:
 *
 * Firebase is not a pure library (in the functional programming sense). The
 * Firebase app and it's auth, firestore, functions instances are initialized in
 * the global scope. So if you simply import this as a "side-effect" in your app
 * module `import "firebase-initialization"`; then it should resolve the emulator
 * initialization issue at the loss of lazy-loading of auth, functions, et al.
 * in development.
 */

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Environment Config
import { environment } from '@ngfire-showcase/shared/config-environments';

const app = firebase.initializeApp(environment.firebase);
if (environment.useEmulators) {
  app.auth().useEmulator('http://localhost:9099');
  app.firestore().useEmulator('localhost', 8080);
  app.functions().useEmulator('localhost', 5001);
}
