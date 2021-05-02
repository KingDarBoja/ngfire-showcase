import { Component } from '@angular/core';

@Component({
  selector: 'web-layout-footer',
  template: `
    <footer
      class="bg-purple-800 text-gray-100 flex justify-center items-center px-4 py-2"
    >
      <ng-content></ng-content>
    </footer>
  `,
})
export class LayoutFooterComponent {}
