import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

/**
 * ThemeService — manages dark/light mode using Angular Signals.
 *
 * Angular Concepts demonstrated:
 *  - Injectable service with `providedIn: 'root'`
 *  - signal() for reactive state
 *  - computed() for derived state
 *  - effect() to sync side-effects (DOM class toggling)
 *  - inject() function (modern DI, no constructor injection)
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  private readonly STORAGE_KEY = 'angular-academy-theme';

  // Signal holding the current theme — single source of truth
  readonly theme = signal<Theme>(this.loadTheme());

  // Computed signal: automatically re-evaluates when `theme` changes
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // effect() runs whenever `theme` signal changes and syncs the DOM
    effect(() => {
      const t = this.theme();
      const html = this.doc.documentElement;
      html.classList.toggle('dark', t === 'dark');
      localStorage.setItem(this.STORAGE_KEY, t);
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  private loadTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'light';
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
