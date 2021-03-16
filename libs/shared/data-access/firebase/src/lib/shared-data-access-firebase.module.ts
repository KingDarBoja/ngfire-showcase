import { NgModule, Injectable } from '@angular/core';
import { FirebaseWrapperModule } from './wrapper';

@Injectable()
@NgModule({
  imports: [FirebaseWrapperModule],
})
export class SharedDataAccessFirebaseModule {}
