import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Shared Libs
import { SharedDataAccessFirebaseModule } from '@ngfire-showcase/shared/data-access/firebase';
import { SharedUiFormsModule } from '@ngfire-showcase/shared/ui/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedDataAccessFirebaseModule,
    SharedUiFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
