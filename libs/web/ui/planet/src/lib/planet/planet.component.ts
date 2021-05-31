import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CameraOptions,
  LoaderService,
  ThreeVector3,
} from '@angular-three/core';
import {
  AdditiveBlending,
  AxesHelper,
  BackSide,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  PointsMaterialParameters,
  ShaderMaterialParameters,
  SphereBufferGeometry,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'ngf-web-planet',
  template: `
    <ngt-canvas
      [linear]="true"
      [camera]="canvasCamera"
      (created)="$event.gl.setClearColor('black')"
    >
      <ngt-axes-helper [args]="axesArgs"></ngt-axes-helper>
      <ngf-web-orbit-control></ngf-web-orbit-control>
      <ngf-web-star></ngf-web-star>
      <ngf-web-globe [geometry]="sphereGeometry"></ngf-web-globe>
      <ngf-web-atmosphere [geometry]="sphereGeometry"></ngf-web-atmosphere>
    </ngt-canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetComponent {
  axesArgs: ConstructorParameters<typeof AxesHelper> = [100];
  canvasCamera: CameraOptions = {
    position: [0, 0, 15],
  };
  sphereGeometry: ConstructorParameters<typeof SphereBufferGeometry> = [
    5,
    50,
    50,
  ];
}

@Component({
  selector: 'ngf-web-globe',
  template: `
    <ng-container *ngIf="earth$ | async as vm">
      <ngt-mesh (animateReady)="animate($event.animateObject)">
        <ngt-sphere-geometry [args]="geometry"> </ngt-sphere-geometry>
        <ngt-shader-material [parameters]="vm.shaderParameters">
        </ngt-shader-material>
      </ngt-mesh>
    </ng-container>
  `,
})
export class GlobeComponent {
  @Input()
  geometry!: ConstructorParameters<typeof SphereBufferGeometry>;

  earth$: Observable<{
    shaderParameters: ShaderMaterialParameters;
  }> = forkJoin([
    this.httpClient.get('./assets/shaders/vertex.glsl', {
      responseType: 'text',
    }),
    this.httpClient.get('./assets/shaders/fragment.glsl', {
      responseType: 'text',
    }),
    this.loaderService.use(TextureLoader, './assets/images/world_map.jpg'),
  ]).pipe(
    map(([vertexShader, fragmentShader, earthTexture]) => ({
      shaderParameters: {
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: earthTexture,
          },
        },
        side: DoubleSide,
      } as ShaderMaterialParameters,
    })),
  );

  animate(sphere: Mesh): void {
    sphere.rotation.y += 0.01;
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loaderService: LoaderService,
  ) {}
}

@Component({
  selector: 'ngf-web-orbit-control',
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
  selector: 'ngf-web-atmosphere',
  template: `
    <ng-container *ngIf="atmosphere$ | async as vm">
      <ngt-mesh [scale]="scale">
        <ngt-sphere-geometry [args]="geometry"> </ngt-sphere-geometry>
        <ngt-shader-material [parameters]="vm.shaderParameters">
        </ngt-shader-material>
      </ngt-mesh>
    </ng-container>
  `,
})
export class AtmosphereComponent {
  @Input()
  geometry!: ConstructorParameters<typeof SphereBufferGeometry>;

  scale: ThreeVector3 = [1.1, 1.1, 1.1];
  atmosphere$: Observable<{
    shaderParameters: ShaderMaterialParameters;
  }> = forkJoin([
    this.httpClient.get('./assets/shaders/atmosphereVertex.glsl', {
      responseType: 'text',
    }),
    this.httpClient.get('./assets/shaders/atmosphereFragment.glsl', {
      responseType: 'text',
    }),
  ]).pipe(
    map(([vertexShader, fragmentShader]) => ({
      shaderParameters: {
        vertexShader,
        fragmentShader,
        blending: AdditiveBlending,
        side: BackSide,
      } as ShaderMaterialParameters,
    })),
  );

  constructor(private readonly httpClient: HttpClient) {}
}

@Component({
  selector: 'ngf-web-star',
  template: `
    <ngt-points [geometry]="starGeometry">
      <ngt-points-material [parameters]="parameters"></ngt-points-material>
    </ngt-points>
  `,
})
export class StarComponent {
  parameters: PointsMaterialParameters = {
    color: '#ffffff',
  };
  starVertices = new Array(10000).fill(0).reduce<number[]>((arr) => {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    arr.push(x, y, z);
    return arr;
  }, []);
  starGeometry = new BufferGeometry();

  constructor() {
    this.starGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(this.starVertices, 3),
    );
  }
}
