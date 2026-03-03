import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="max-w-lg mx-auto text-center py-24 space-y-6">
      <div class="text-8xl font-black text-gray-100 dark:text-gray-800">404</div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
      <p class="text-gray-500 dark:text-gray-400">
        This page doesn't exist yet — it will be built in upcoming steps!
      </p>
      <a routerLink="/"
         class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200">
        ← Go Home
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
