import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';

interface Feature {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface Topic {
  id: string;
  label: string;
  icon: string;
  route: string;
  xp: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

/**
 * HomeComponent — the landing/dashboard page.
 *
 * Angular Concepts demonstrated:
 *  - Standalone component
 *  - inject() for DI
 *  - RouterLink directive for navigation
 *  - @for / @if control flow
 *  - Reading signals in templates (no async pipe needed)
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private progressService = inject(ProgressService);

  completedCount = this.progressService.completedCount;
  totalXp        = this.progressService.totalXp;
  level          = this.progressService.level;
  earnedBadges   = this.progressService.earnedBadgeIds;

  readonly features: Feature[] = [
    { icon: '📚', title: 'Structured Lessons',  desc: '12 topics from zero to hero, each with clear examples and real code.',    color: 'from-blue-500 to-blue-700'    },
    { icon: '💻', title: 'Code Playground',     desc: 'Write and run Angular code right in the browser with Monaco Editor.',     color: 'from-purple-500 to-purple-700' },
    { icon: '✨', title: 'AI Helper',           desc: 'Ask anything about Angular and get instant, context-aware answers.',      color: 'from-amber-400 to-amber-600'   },
    { icon: '🎯', title: 'Progress Tracking',   desc: 'Earn XP, unlock badges, and visualize your learning journey.',           color: 'from-green-500 to-green-700'   },
    { icon: '🔥', title: 'Interactive Examples', desc: 'Every concept includes a live, editable example you can play with.',    color: 'from-red-500 to-red-700'       },
    { icon: '🏆', title: 'Achievement Badges',  desc: 'Complete milestones and earn badges to celebrate your progress.',        color: 'from-teal-500 to-teal-700'     },
  ];

  readonly topics: Topic[] = [
    { id: 'basics',         label: 'Angular Basics',  icon: '⭐', route: '/learn/basics',         xp: 50,  difficulty: 'Beginner'     },
    { id: 'components',     label: 'Components',      icon: '🧩', route: '/learn/components',     xp: 60,  difficulty: 'Beginner'     },
    { id: 'data-binding',   label: 'Data Binding',    icon: '🔗', route: '/learn/data-binding',   xp: 60,  difficulty: 'Beginner'     },
    { id: 'directives',     label: 'Directives',      icon: '🏷️', route: '/learn/directives',     xp: 70,  difficulty: 'Intermediate' },
    { id: 'services',       label: 'Services & DI',   icon: '⚙️', route: '/learn/services',       xp: 80,  difficulty: 'Intermediate' },
    { id: 'routing',        label: 'Routing',         icon: '🗺️', route: '/learn/routing',        xp: 80,  difficulty: 'Intermediate' },
    { id: 'signals',        label: 'Signals',         icon: '📡', route: '/learn/signals',        xp: 90,  difficulty: 'Intermediate' },
    { id: 'rxjs',           label: 'RxJS Basics',     icon: '🔄', route: '/learn/rxjs',           xp: 90,  difficulty: 'Advanced'     },
    { id: 'forms',          label: 'Forms',           icon: '📝', route: '/learn/forms',          xp: 80,  difficulty: 'Intermediate' },
    { id: 'http',           label: 'HTTP',            icon: '☁️', route: '/learn/http',           xp: 80,  difficulty: 'Intermediate' },
    { id: 'best-practices', label: 'Best Practices',  icon: '✅', route: '/learn/best-practices', xp: 100, difficulty: 'Advanced'     },
  ];

  isCompleted(id: string): boolean {
    return this.progressService.isCompleted(id);
  }

  difficultyColor(d: string): string {
    if (d === 'Beginner')     return 'text-green-500  bg-green-50   dark:bg-green-900/20  dark:text-green-400';
    if (d === 'Intermediate') return 'text-amber-500  bg-amber-50   dark:bg-amber-900/20  dark:text-amber-400';
    return                           'text-red-500    bg-red-50     dark:bg-red-900/20    dark:text-red-400';
  }
}
