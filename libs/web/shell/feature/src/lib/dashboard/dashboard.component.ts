import { CameraOptions } from '@angular-three/core';
import { Component } from '@angular/core';
import {
  AxesHelper,
  DoubleSide,
  Mesh,
  MeshBasicMaterialParameters,
  SphereBufferGeometry,
} from 'three';

@Component({
  styles: [
    `
      .globe-wrapper {
        width: auto;
        height: 400px;
      }
    `,
  ],
  template: `
    <h2>Dashboard</h2>

    <h4>ThreeJS Demo with @angular/threejs</h4>

    <section class="globe-wrapper">
      <ngt-canvas
        [camera]="canvasCamera"
        (created)="$event.gl.setClearColor('black')"
      >
        <ngt-axes-helper [args]="axesArgs"></ngt-axes-helper>
        <ngt-mesh (animateReady)="animate($event.animateObject)">
          <ngt-sphere-geometry [args]="sphereArgs"> </ngt-sphere-geometry>
          <ngt-mesh-basic-material [parameters]="parameters">
          </ngt-mesh-basic-material>
        </ngt-mesh>
      </ngt-canvas>
    </section>
  `,
})
export class DashboardComponent {
  canvasCamera: CameraOptions = {
    position: [0, 0, 20],
  };
  parameters: MeshBasicMaterialParameters = {
    color: '#009dff',
    side: DoubleSide,
    wireframe: true,
  };
  axesArgs: ConstructorParameters<typeof AxesHelper> = [100];
  sphereArgs: ConstructorParameters<typeof SphereBufferGeometry> = [10, 40, 40];

  animate(sphere: Mesh): void {
    sphere.rotation.y += 0.01;
  }
}
