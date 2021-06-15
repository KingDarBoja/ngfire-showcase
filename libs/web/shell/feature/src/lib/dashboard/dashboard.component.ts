import { Component } from '@angular/core';

@Component({
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
      .content {
        width: 100%;
      }
      .canvas-container {
        width: 100%;
        flex: 1;
      }
    `,
  ],
  template: `
    <div class="content">
      <h2>Dashboard</h2>
      <!-- <h4>ThreeJS Demo with @angular/threejs</h4> -->
    </div>

    <!-- <section class="canvas-container">
      <ngf-web-planet></ngf-web-planet>
    </section> -->
  `,
})
export class DashboardComponent {}
