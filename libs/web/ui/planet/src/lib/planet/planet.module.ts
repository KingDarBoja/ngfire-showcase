import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThreeCoreModule } from '@angular-three/core';
import { ThreePointsModule } from '@angular-three/core/points';
import { ThreeMeshModule } from '@angular-three/core/meshes';
import { ThreeAxesHelperModule } from '@angular-three/core/helpers';
import { ThreeSphereBufferGeometryModule } from '@angular-three/core/geometries';
import {
  ThreePointsMaterialModule,
  ThreeShaderMaterialModule,
} from '@angular-three/core/materials';
import { ThreeOrbitControlsModule } from '@angular-three/controls/orbit-controls';

import {
  AtmosphereComponent,
  GlobeComponent,
  OrbitControlComponent,
  PlanetComponent,
  StarComponent,
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
    ThreePointsModule,
    ThreePointsMaterialModule,
    ThreeShaderMaterialModule,
  ],
  exports: [PlanetComponent],
  declarations: [
    AtmosphereComponent,
    PlanetComponent,
    GlobeComponent,
    OrbitControlComponent,
    StarComponent,
  ],
})
export class PlanetModule {}
