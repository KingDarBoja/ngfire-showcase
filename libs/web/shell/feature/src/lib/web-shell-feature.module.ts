import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataAccessFirebaseModule } from '@ngfire-showcase/web/core/configuration-firebase';

@NgModule({
  imports: [CommonModule, SharedDataAccessFirebaseModule.forRoot()],
})
export class WebShellFeatureModule {}
