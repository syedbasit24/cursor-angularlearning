import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { ProgressService } from '../../core/services/progress.service';
import {
  TOPICS, CATEGORIES, DIFFICULTIES,
  DIFFICULTY_CONFIG, TAG_COLOR_CONFIG,
  Topic, Difficulty, Category,
} from './topics.data';

/**
 * TopicsComponent — Full Angular topic browser.
 *
 * Angular Concepts demonstrated:
 *  - signal()    — search query, active filters
 *  - computed()  — filtered list, stats, derived UI state
 *  - inject()    — ProgressService integration
 *  - FormsModule — [(ngModel)] for search input
 *  - RouterLink  — navigate to each lesson
 *  - @if / @for  — new control flow syntax
 */
@Component({
  selector: 'app-topics',
  imports: [RouterLink, FormsModule, NgStyle],
  templateUrl: './topics.component.html',
})
export class TopicsComponent {
  private progressService = inject(ProgressService);

  // ── Exposed data ─────────────────────────────────────────────
  allTopics    = TOPICS;
  categories   = CATEGORIES;
  difficulties = DIFFICULTIES;
  diffConfig   = DIFFICULTY_CONFIG;
  tagConfig    = TAG_COLOR_CONFIG;

  // ── Filter state ─────────────────────────────────────────────
  searchQuery      = signal('');
  activeCategory   = signal<Category | 'All'>('All');
  activeDifficulty = signal<Difficulty | 'All'>('All');
  expandedCard     = signal<string | null>(null);

  // ── Derived: filtered topics ──────────────────────────────────
  filteredTopics = computed(() => {
    const q    = this.searchQuery().toLowerCase().trim();
    const cat  = this.activeCategory();
    const diff = this.activeDifficulty();

    return this.allTopics.filter(t => {
      const matchSearch = !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.label.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q);

      const matchCat  = cat  === 'All' || t.category  === cat;
      const matchDiff = diff === 'All' || t.difficulty === diff;

      return matchSearch && matchCat && matchDiff;
    });
  });

  // ── Stats ────────────────────────────────────────────────────
  completedCount = computed(() => this.progressService.completedCount());
  totalXpEarned  = computed(() => this.progressService.totalXp());
  totalXpAvail   = computed(() => this.allTopics.reduce((s, t) => s + t.xp, 0));
  newTopicsCount = computed(() => this.allTopics.filter(t => t.isNew).length);
  progressPct    = computed(() =>
    Math.round((this.completedCount() / this.allTopics.length) * 100)
  );

  // ── Per-topic helpers ─────────────────────────────────────────
  isCompleted(id: string): boolean {
    return this.progressService.isCompleted(id);
  }

  toggleExpand(id: string): void {
    this.expandedCard.update(cur => cur === id ? null : id);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.activeCategory.set('All');
    this.activeDifficulty.set('All');
  }

  /** Returns a category count for badge display */
  categoryCount(cat: Category | 'All'): number {
    if (cat === 'All') return this.allTopics.length;
    return this.allTopics.filter(t => t.category === cat).length;
  }

  difficultyCount(diff: Difficulty | 'All'): number {
    if (diff === 'All') return this.allTopics.length;
    return this.allTopics.filter(t => t.difficulty === diff).length;
  }

  /** Maps Tailwind color token to hex for inline gradient styles */
  private readonly COLOR_MAP: Record<string, string> = {
    'red-500':     '#ef4444', 'orange-500':  '#f97316', 'amber-500':   '#f59e0b',
    'yellow-500':  '#eab308', 'green-500':   '#22c55e', 'teal-500':    '#14b8a6',
    'cyan-500':    '#06b6d4', 'blue-500':    '#3b82f6', 'indigo-500':  '#6366f1',
    'violet-500':  '#8b5cf6', 'purple-500':  '#a855f7', 'pink-500':    '#ec4899',
    'rose-500':    '#f43f5e', 'emerald-500': '#10b981', 'slate-600':   '#475569',
    'gray-700':    '#374151',
  };

  gradientStyle(gradient: string): Record<string, string> {
    // gradient is e.g. "from-red-500 to-orange-500"
    const parts   = gradient.split(' ');
    const fromKey = parts[0]?.replace('from-', '') ?? 'red-500';
    const toKey   = parts[1]?.replace('to-',   '') ?? 'orange-500';
    const from    = this.COLOR_MAP[fromKey] ?? '#ef4444';
    const to      = this.COLOR_MAP[toKey]   ?? '#f97316';
    return { background: `linear-gradient(135deg, ${from}, ${to})` };
  }
}
