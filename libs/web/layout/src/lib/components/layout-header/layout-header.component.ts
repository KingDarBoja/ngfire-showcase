import { Component, Input } from '@angular/core';
import { AuthFacade } from '@ngfire-showcase/auth/data-access';

@Component({
  selector: 'web-layout-header',
  template: `
    <mat-toolbar>
      <section class="container mx-auto flex flex-row md:px-4">
        <span class="font-bold">NG Fire Showcase</span>
        <span class="flex flex-auto"></span>
        <button mat-icon-button class="flex items-center" aria-label="sign out" (click)="logout()">
          <mat-icon class="material-icons-outlined">logout</mat-icon>
        </button>
      </section>

    </mat-toolbar>
  `,
})
export class LayoutHeaderComponent {
  @Input() links: { label: string; route: string }[] = [];

  constructor(private readonly authFacade: AuthFacade) {}

  logout() {
    this.authFacade.logout();
  }
}
