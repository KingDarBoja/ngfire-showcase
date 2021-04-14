import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  AngularFireFunctionsModule,
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

interface SharedDataAccessFirebaseConfig {
  firebaseConfig: FirebaseOptions;
  firestoreSettings?: firebase.firestore.Settings;
  firestoreEnablePersistence?: boolean;
  firestorePersistenceSettings?: firebase.firestore.PersistenceSettings;
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
    config: SharedDataAccessFirebaseConfig
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
          useValue: config.firestoreSettings,
        },
        {
          provide: ENABLE_PERSISTENCE,
          useValue: config.firestoreEnablePersistence ?? false,
        },
        {
          provide: PERSISTENCE_SETTINGS,
          useValue: config.firestorePersistenceSettings,
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
