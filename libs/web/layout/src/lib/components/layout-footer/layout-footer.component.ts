import { Component } from '@angular/core';

@Component({
  selector: 'web-layout-footer',
  styleUrls: ['./layout-footer.component.scss'],
  template: `
    <footer id="app-footer" class="flex justify-center items-center px-4 py-2">
      <ng-content></ng-content>
    </footer>
  `,
})
export class LayoutFooterComponent {}
