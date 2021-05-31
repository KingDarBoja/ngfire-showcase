import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThreeCoreModule } from '@angular-three/core';
import { ThreeMeshModule } from '@angular-three/core/meshes';
import { ThreeAxesHelperModule } from '@angular-three/core/helpers';
import { ThreeSphereBufferGeometryModule } from '@angular-three/core/geometries';
import {
  ThreeMeshBasicMaterialModule,
  ThreeShaderMaterialModule,
} from '@angular-three/core/materials';
import { ThreeOrbitControlsModule } from '@angular-three/controls/orbit-controls';

import {
  AtmosphereComponent,
  GlobeComponent,
  OrbitControlComponent,
  PlanetComponent,
} from './planet.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ThreeCoreModule,
    ThreeMeshModule,
    ThreeAxesHelperModule,
    ThreeOrbitControlsModule,
    ThreeSphereBufferGeometryModule,
    ThreeShaderMaterialModule,
    ThreeMeshBasicMaterialModule,
  ],
  exports: [PlanetComponent],
  declarations: [
    AtmosphereComponent,
    PlanetComponent,
    GlobeComponent,
    OrbitControlComponent,
  ],
})
export class PlanetModule {}
