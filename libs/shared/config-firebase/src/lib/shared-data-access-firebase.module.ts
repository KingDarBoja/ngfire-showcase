/* eslint-disable max-len */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import {
  AngularFireAuthModule,
  LANGUAGE_CODE,
  PERSISTENCE,
  SETTINGS as AUTH_SETTINGS,
  TENANT_ID,
  USE_DEVICE_LANGUAGE,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  AngularFireFunctionsModule,
  NEW_ORIGIN_BEHAVIOR,
  ORIGIN,
  REGION,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
  SETTINGS as FIRESTORE_SETTINGS,
  ENABLE_PERSISTENCE,
  PERSISTENCE_SETTINGS,
} from '@angular/fire/firestore';

// Firebase Config
import type { FirebaseOptions } from '@firebase/app-types';
import firebase from 'firebase/app';

/**
 * Firebase-JS SDK Auth Persistence type based on the newly auth-exp
 * - [firebase js auth-exp](https://github.com/firebase/firebase-js-sdk/blob/d47fb414bfd9508f611a9adbc253fb360c88fbd3/packages-exp/auth-exp/src/core/persistence/index.ts)
 * - [firebase js vanilla](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#persistence_1)
 */
const enum PersistenceType {
  SESSION = 'SESSION',
  LOCAL = 'LOCAL',
  NONE = 'NONE',
}

interface SharedDataAccessFirebaseConfig {
  /**
   * Auth Config to pass into DI Tokens.
   *
   * These are based on the official firebase-js auth SDK.
   * https://firebase.google.com/docs/reference/js/firebase.auth.Auth
   */
  authConfig?: {
    settings?: firebase.auth.AuthSettings;
    persistence?: PersistenceType;
    useDeviceLanguage?: string;
    languageCode?: string;
    tenantId?: string;
  };
  firebaseConfig: FirebaseOptions;
  firestoreConfig?: {
    settings?: firebase.firestore.Settings;
    enablePersistence?: boolean;
    persistenceSettings?: firebase.firestore.PersistenceSettings;
  };
  functionsConfig?: {
    newOriginBehavior?: boolean;
    origin?: string;
    region?: string;
  };
  useEmulators?: boolean;
}

@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
  ],
})
export class SharedDataAccessRootFirebaseModule {}

@NgModule({})
export class SharedDataAccessFirebaseModule {
  static forRoot(
    config: SharedDataAccessFirebaseConfig,
  ): ModuleWithProviders<SharedDataAccessRootFirebaseModule> {
    return {
      ngModule: SharedDataAccessRootFirebaseModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: config.firebaseConfig,
        },
        {
          provide: FIRESTORE_SETTINGS,
          useValue: config.firestoreConfig?.settings ?? null,
        },
        {
          provide: ENABLE_PERSISTENCE,
          useValue: config.firestoreConfig?.enablePersistence ?? false,
        },
        {
          provide: PERSISTENCE_SETTINGS,
          useValue: config.firestoreConfig?.persistenceSettings ?? null,
        },
        {
          provide: AUTH_SETTINGS,
          useValue: config.authConfig?.settings ?? null,
        },
        {
          provide: PERSISTENCE,
          useValue: config.authConfig?.persistence ?? null,
        },
        {
          provide: USE_DEVICE_LANGUAGE,
          useValue: config.authConfig?.useDeviceLanguage ?? null,
        },
        {
          provide: LANGUAGE_CODE,
          useValue: config.authConfig?.languageCode ?? null,
        },
        {
          provide: TENANT_ID,
          useValue: config.authConfig?.tenantId ?? null,
        },
        {
          provide: NEW_ORIGIN_BEHAVIOR,
          useValue: config.functionsConfig?.newOriginBehavior ?? null,
        },
        {
          provide: ORIGIN,
          useValue: config?.functionsConfig?.origin ?? null,
        },
        {
          provide: REGION,
          useValue: config?.functionsConfig?.region ?? null,
        },
        {
          provide: USE_AUTH_EMULATOR,
          useValue: config.useEmulators ? ['localhost', 9099] : undefined,
        },
        {
          provide: USE_FIRESTORE_EMULATOR,
          useValue: config.useEmulators ? ['localhost', 8080] : undefined,
        },
        {
          provide: USE_FUNCTIONS_EMULATOR,
          useValue: config.useEmulators ? ['localhost', 5001] : undefined,
        },
      ],
    };
  }
}
