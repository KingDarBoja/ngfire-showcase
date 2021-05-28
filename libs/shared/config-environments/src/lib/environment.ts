// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: false,
  useEmulators: false,
  firebase: {
    apiKey: 'AIzaSyBXb3nviCyhTpwBPP214LVacQ6ogs3fLWg',
    authDomain: 'coljobs-6f319.firebaseapp.com',
    projectId: 'coljobs-6f319',
    storageBucket: 'coljobs-6f319.appspot.com',
    messagingSenderId: '14525357538',
    appId: '1:14525357538:web:5e51119dea898dd1a0adbb',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
