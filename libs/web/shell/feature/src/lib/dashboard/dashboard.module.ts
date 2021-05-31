import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WebUiPlanetModule } from '@ngfire-showcase/web/ui/planet';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    WebUiPlanetModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class DashboardModule {}
