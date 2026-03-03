import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * App (Root Component) — the absolute root of the Angular application.
 *
 * This component is MINIMAL — it just renders <router-outlet>.
 * The ShellComponent (loaded via routing) handles the actual layout.
 *
 * Angular Concepts:
 *  - This is a standalone component (no NgModule)
 *  - It is bootstrapped in main.ts via bootstrapApplication()
 *  - RouterOutlet renders whichever component matches the current URL
 *
 * Flow: main.ts → bootstrapApplication(App) → App renders <router-outlet>
 *        → Router matches URL → loads ShellComponent → Shell renders pages
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [],
})
export class App {}
