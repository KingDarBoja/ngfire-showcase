import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreeCoreModule } from '@angular-three/core';
import { ThreeMeshModule } from '@angular-three/core/meshes';
import { ThreeAxesHelperModule } from '@angular-three/core/helpers';
import { ThreeSphereBufferGeometryModule } from '@angular-three/core/geometries';
import { ThreeMeshBasicMaterialModule } from '@angular-three/core/materials';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ThreeCoreModule,
    ThreeMeshModule,
    ThreeAxesHelperModule,
    ThreeSphereBufferGeometryModule,
    ThreeMeshBasicMaterialModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class DashboardModule {}
