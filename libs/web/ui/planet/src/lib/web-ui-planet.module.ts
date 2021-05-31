import { NgModule } from '@angular/core';
import { PlanetModule } from './planet/planet.module';

@NgModule({
  imports: [PlanetModule],
  exports: [PlanetModule],
})
export class WebUiPlanetModule {}
