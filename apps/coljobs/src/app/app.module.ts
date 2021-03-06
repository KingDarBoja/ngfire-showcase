import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebShellFeatureModule } from '@ngfire-showcase/web/shell/feature';
import { WebUiFormModule } from '@ngfire-showcase/web/ui/form';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    WebShellFeatureModule,
    WebUiFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
