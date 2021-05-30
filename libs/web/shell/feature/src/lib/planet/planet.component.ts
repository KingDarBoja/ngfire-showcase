import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  CameraOptions,
  LoaderService,
  ThreeVector3,
} from '@angular-three/core';
import {
  AxesHelper,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterialParameters,
  SphereBufferGeometry,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngf-shell-planet',
  template: `
    <ngt-canvas
      [linear]="true"
      [camera]="canvasCamera"
      (created)="$event.gl.setClearColor('black')"
    >
      <ngt-axes-helper [args]="axesArgs"></ngt-axes-helper>
      <ngf-shell-orbit-control></ngf-shell-orbit-control>
      <ngf-shell-globe [geometry]="sphereGeometry"></ngf-shell-globe>
      <ngf-shell-atmosphere [geometry]="sphereGeometry"></ngf-shell-atmosphere>
    </ngt-canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetComponent {
  axesArgs: ConstructorParameters<typeof AxesHelper> = [100];
  canvasCamera: CameraOptions = {
    position: [0, 0, 20],
  };
  sphereGeometry: ConstructorParameters<typeof SphereBufferGeometry> = [
    10,
    40,
    40,
  ];
}

@Component({
  selector: 'ngf-shell-globe',
  template: `
    <ng-container *ngIf="earth$ | async as vm">
      <ngt-mesh (animateReady)="animate($event.animateObject)">
        <ngt-sphere-geometry [args]="geometry"> </ngt-sphere-geometry>
        <ngt-mesh-basic-material [parameters]="vm.meshParameters">
        </ngt-mesh-basic-material>
      </ngt-mesh>
    </ng-container>
  `,
})
export class GlobeComponent {
  @Input()
  geometry!: ConstructorParameters<typeof SphereBufferGeometry>;

  earth$ = this.loaderService
    .use(TextureLoader, './assets/images/world_map.jpg')
    .pipe(
      map((texture) => ({
        meshParameters: {
          map: texture,
          side: DoubleSide,
        },
      })),
    );

  animate(sphere: Mesh): void {
    sphere.rotation.y += 0.01;
  }

  constructor(private readonly loaderService: LoaderService) {}
}

@Component({
  selector: 'ngf-shell-orbit-control',
  template: `
    <ngt-orbit-controls (ready)="ready($event)"></ngt-orbit-controls>
  `,
})
export class OrbitControlComponent {
  ready(controls: OrbitControls) {
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
  }

  animateReady(animateObject: OrbitControls) {
    animateObject.update();
  }
}

@Component({
  selector: 'ngf-shell-atmosphere',
  template: `
    <ngt-mesh [scale]="scale">
      <ngt-sphere-geometry [args]="geometry"> </ngt-sphere-geometry>
      <ngt-mesh-basic-material [parameters]="meshParameters">
      </ngt-mesh-basic-material>
    </ngt-mesh>
  `,
})
export class AtmosphereComponent {
  @Input()
  geometry!: ConstructorParameters<typeof SphereBufferGeometry>;

  scale: ThreeVector3 = [1.1, 1.1, 1.1];
  meshParameters: MeshBasicMaterialParameters = {
    color: new Color(0.3, 0.6, 1.0),
    wireframe: true,
  };
}
