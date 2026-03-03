import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

/**
 * ShellComponent — the master layout container.
 *
 * Responsibilities:
 *  - Renders Sidebar + Header + <router-outlet>
 *  - Manages the sidebar collapsed/expanded state
 *  - All page components are rendered inside <router-outlet>
 *
 * Angular Concepts demonstrated:
 *  - Standalone component with explicit imports[]
 *  - signal() for local UI state
 *  - RouterOutlet — where lazy-loaded pages are injected
 *  - Component composition (parent orchestrating child components)
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  // Local signal: sidebar collapsed state
  sidebarCollapsed = signal<boolean>(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
