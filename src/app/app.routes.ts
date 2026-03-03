import { Routes } from '@angular/router';

/**
 * App Routes — Lazy Loaded, Shell-wrapped.
 *
 * Angular Routing Concepts:
 *  - loadComponent()           → lazy-loads a standalone component
 *  - Shell as parent route     → sidebar + header rendered once; pages swap via router-outlet
 *  - withComponentInputBinding → route data['lessonId'] auto-bound to LessonComponent.lessonId input
 *  - withViewTransitions       → CSS View Transitions API for smooth page changes
 *  - path: '**'                → wildcard 404 catch-all
 */

/** Helper: creates a lesson route without repeating the loadComponent boilerplate */
function lessonRoute(path: string, lessonId: string, title: string) {
  return {
    path,
    loadComponent: () =>
      import('./features/learn/lesson/lesson.component').then(m => m.LessonComponent),
    data: { lessonId },
    title: `${title} · Angular Academy`,
  };
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/shell/shell.component').then(m => m.ShellComponent),
    children: [

      // ── Home ─────────────────────────────────────────────────
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home · Angular Academy',
      },

      // ── Learn (parent with all 11 lesson children) ────────────
      {
        path: 'learn',
        loadComponent: () =>
          import('./features/learn/learn.component').then(m => m.LearnComponent),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'basics' },

          lessonRoute('basics',         'basics',         'Angular Basics'),
          lessonRoute('components',     'components',     'Components'),
          lessonRoute('data-binding',   'data-binding',   'Data Binding'),
          lessonRoute('directives',     'directives',     'Directives'),
          lessonRoute('services',       'services',       'Services & DI'),
          lessonRoute('routing',        'routing',        'Routing'),
          lessonRoute('signals',        'signals',        'Signals'),
          lessonRoute('rxjs',           'rxjs',           'RxJS Basics'),
          lessonRoute('forms',          'forms',          'Forms'),
          lessonRoute('http',           'http',           'HTTP Client'),
          lessonRoute('best-practices', 'best-practices', 'Best Practices'),
        ],
      },

      // ── Topics ───────────────────────────────────────────────
      {
        path: 'topics',
        loadComponent: () =>
          import('./features/topics/topics.component').then(m => m.TopicsComponent),
        title: 'Topics · Angular Academy',
      },

      // ── Playground ───────────────────────────────────────────
      {
        path: 'playground',
        loadComponent: () =>
          import('./features/playground/playground.component').then(m => m.PlaygroundComponent),
        title: 'Playground · Angular Academy',
      },

      // ── AI Helper ────────────────────────────────────────────
      {
        path: 'ai-help',
        loadComponent: () =>
          import('./features/ai-help/ai-help.component').then(m => m.AiHelpComponent),
        title: 'AI Helper · Angular Academy',
      },

      // ── About ────────────────────────────────────────────────
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then(m => m.AboutComponent),
        title: 'About · Angular Academy',
      },

      // ── 404 ──────────────────────────────────────────────────
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: '404 · Angular Academy',
      },
    ],
  },
];
