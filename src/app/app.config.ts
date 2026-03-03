import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * App Configuration — the entry point for Angular providers.
 *
 * Angular Concepts demonstrated:
 *  - ApplicationConfig (replaces AppModule in standalone apps)
 *  - provideRouter()             → enables Angular Router
 *  - withComponentInputBinding() → route data/params auto-bind to component @input()
 *  - withViewTransitions()       → enables smooth page transition animations (CSS View Transitions API)
 *  - No NgModule needed! This is the modern standalone approach.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),              // enables HttpClient for loading lesson JSON files
    provideRouter(
      routes,
      withComponentInputBinding(),   // route data['topic'] → component input('topic')
      withViewTransitions(),          // browser-native page transitions
    ),
  ],
};
