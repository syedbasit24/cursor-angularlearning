import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-learn',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class LearnComponent {}
