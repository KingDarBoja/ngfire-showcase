import { NgModule, Injectable } from '@angular/core';
// See https://github.com/angular/angularfire/issues/2656
// import 'firebase/auth';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFireAuthModule,
  // USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
// import {
//   AngularFireFunctionsModule,
//   USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
// } from '@angular/fire/functions';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/firestore';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { environment } from '@ngfire-showcase/shared/environments';

@Injectable()
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    // AngularFireFunctionsModule,
    // AngularFireMessagingModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    // AngularFireStorageModule,
    // AngularFireAnalyticsModule,
  ],
  providers: [
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: environment.emulator ? ['localhost', 9099] : undefined,
    // },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.emulator ? ['localhost', 8080] : undefined,
    },
    // {
    //   provide: USE_FUNCTIONS_EMULATOR,
    //   useValue: environment.emulator ? ['localhost', 5001] : undefined,
    // },
  ],
})
export class FirebaseWrapperModule {}
