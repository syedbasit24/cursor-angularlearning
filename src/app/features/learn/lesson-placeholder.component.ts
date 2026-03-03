import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Temporary placeholder for all lesson routes.
 * Will be replaced by full lesson components in Step 2.
 */
@Component({
  selector: 'app-lesson-placeholder',
  imports: [RouterLink],
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="flex items-center gap-3">
        <a routerLink="/learn" class="text-gray-400 hover:text-primary-500 transition-colors text-sm">← Learn</a>
        <span class="text-gray-600">/</span>
        <span class="text-gray-600 text-sm font-medium">{{ topic() }}</span>
      </div>

      <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-5">
        <div class="text-6xl">🚧</div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ topic() }}</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Full lesson content coming in <strong class="text-primary-500">Step 2</strong> — with explanations, diagrams, interactive examples, and interview questions.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <a routerLink="/"
             class="px-5 py-2.5 rounded-xl font-semibold text-sm
                    bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200">
            ← Home
          </a>
          <a routerLink="/topics"
             class="px-5 py-2.5 rounded-xl font-semibold text-sm
                    bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                    border border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
            Browse Topics
          </a>
        </div>
      </div>
    </div>
  `,
})
export class LessonPlaceholderComponent {
  topic = input<string>('Lesson');
}
