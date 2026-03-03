import { Component, output, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ProgressService } from '../../services/progress.service';

/**
 * HeaderComponent — top navigation bar.
 *
 * Angular Concepts demonstrated:
 *  - output() signal-based output (replaces @Output + EventEmitter in Angular 17+)
 *  - inject() for dependency injection
 *  - Computed signals used directly in templates
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // output() replaces: @Output() toggleSidebar = new EventEmitter<void>()
  readonly toggleSidebar = output<void>();

  private themeService    = inject(ThemeService);
  private progressService = inject(ProgressService);

  isDark    = this.themeService.isDark;
  totalXp   = this.progressService.totalXp;
  level     = this.progressService.level;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
