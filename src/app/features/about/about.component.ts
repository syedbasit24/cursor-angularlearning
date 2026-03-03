import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <div class="max-w-3xl mx-auto text-center py-16 space-y-6">
      <div class="text-6xl animate-float">🎓</div>
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">About Angular Academy</h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        Angular Academy is a fully static, open-source learning platform built with
        <strong class="text-primary-500">Angular 21</strong>,
        <strong class="text-blue-500">TailwindCSS</strong>, and
        <strong class="text-purple-500">Monaco Editor</strong>.
        It teaches Angular through interactive examples, a code playground, and an AI helper.
      </p>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Built step-by-step as a learning project itself.</p>
      <a routerLink="/"
         class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200">
        ← Back to Home
      </a>
    </div>
  `,
})
export class AboutComponent {}
