import { Component, input, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ProgressService } from '../../services/progress.service';
import { NAV_ITEMS, NavItem } from '../../../shared/config/nav.config';

/**
 * SidebarComponent — the main navigation panel.
 *
 * Angular Concepts demonstrated:
 *  - input() signal-based input (Angular 17+)
 *  - signal() for local component state
 *  - computed() for derived state
 *  - inject() for DI
 *  - RouterLink / RouterLinkActive directives
 *  - @if / @for new control flow (Angular 17+)
 */
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // Signal-based input (replaces @Input() decorator in Angular 17+)
  collapsed = input<boolean>(false);

  private themeService   = inject(ThemeService);
  private progressService = inject(ProgressService);

  isDark         = this.themeService.isDark;
  totalXp        = this.progressService.totalXp;
  completedCount = this.progressService.completedCount;
  level          = this.progressService.level;
  xpPercent      = this.progressService.xpPercent;

  navItems = NAV_ITEMS;

  // Track which groups are expanded
  expandedGroups = signal<Set<string>>(new Set(['Learn Angular']));

  xpBarWidth = computed(() => `${this.xpPercent()}%`);

  toggleGroup(label: string): void {
    this.expandedGroups.update(set => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  isGroupExpanded(label: string): boolean {
    return this.expandedGroups().has(label);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  trackByLabel(_: number, item: NavItem): string {
    return item.label;
  }

  getNavIcon(name: string): string {
    const icons: Record<string, string> = {
      home:     '🏠',
      book:     '📚',
      star:     '⭐',
      puzzle:   '🧩',
      link:     '🔗',
      tag:      '🏷️',
      server:   '⚙️',
      route:    '🗺️',
      signal:   '📡',
      refresh:  '🔄',
      form:     '📝',
      cloud:    '☁️',
      check:    '✅',
      grid:     '📋',
      code:     '💻',
      sparkles: '✨',
      info:     'ℹ️',
    };
    return icons[name] ?? '📄';
  }
}
