import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PlanetModule } from '../planet/planet.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PlanetModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class DashboardModule {}
