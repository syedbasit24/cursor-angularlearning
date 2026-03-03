import { Injectable, signal, computed } from '@angular/core';

export interface TopicProgress {
  id: string;
  completed: boolean;
  completedAt: string;
  xp: number;
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface UserProgress {
  topics: Record<string, TopicProgress>;
  totalXp: number;
  streak: number;
  lastVisit: string;
  badges: string[];
}

const ALL_BADGES: Badge[] = [
  { id: 'first-step',     label: 'First Step',     icon: '🚀', description: 'Complete your first topic'      },
  { id: 'getting-going',  label: 'Getting Going',  icon: '⚡', description: 'Complete 3 topics'              },
  { id: 'halfway',        label: 'Halfway There',  icon: '🎯', description: 'Complete 6 topics'              },
  { id: 'angular-pro',    label: 'Angular Pro',    icon: '🏆', description: 'Complete all 11 topics'         },
  { id: 'xp-100',         label: 'XP Collector',   icon: '💎', description: 'Earn 100 XP'                    },
  { id: 'xp-500',         label: 'XP Master',      icon: '👑', description: 'Earn 500 XP'                    },
];

/**
 * ProgressService — tracks user learning progress with localStorage persistence.
 *
 * Angular Concepts demonstrated:
 *  - signal() for writable reactive state
 *  - computed() for derived read-only state
 *  - Service as single source of truth (shared state pattern)
 */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly STORAGE_KEY = 'angular-academy-progress';

  private readonly _progress = signal<UserProgress>(this.load());

  // Derived signals — these auto-update whenever `_progress` changes
  readonly completedCount  = computed(() => Object.values(this._progress().topics).filter(t => t.completed).length);
  readonly totalXp         = computed(() => this._progress().totalXp);
  readonly streak          = computed(() => this._progress().streak);
  readonly earnedBadgeIds  = computed(() => this._progress().badges);
  readonly allBadges       = ALL_BADGES;
  readonly xpToNextLevel   = computed(() => {
    const xp = this._progress().totalXp;
    const level = Math.floor(xp / 100);
    return (level + 1) * 100 - xp;
  });
  readonly level = computed(() => Math.floor(this._progress().totalXp / 100) + 1);
  readonly xpPercent = computed(() => (this._progress().totalXp % 100));

  isCompleted(topicId: string): boolean {
    return this._progress().topics[topicId]?.completed ?? false;
  }

  completeTopic(topicId: string, xp = 50): void {
    this._progress.update(p => {
      if (p.topics[topicId]?.completed) return p;

      const newXp   = p.totalXp + xp;
      const updated: UserProgress = {
        ...p,
        topics: {
          ...p.topics,
          [topicId]: { id: topicId, completed: true, completedAt: new Date().toISOString(), xp },
        },
        totalXp: newXp,
        badges:  this.computeBadges(p.badges, Object.keys(p.topics).length + 1, newXp),
      };
      this.save(updated);
      return updated;
    });
  }

  private computeBadges(current: string[], completedCount: number, xp: number): string[] {
    const badges = new Set(current);
    if (completedCount >= 1)  badges.add('first-step');
    if (completedCount >= 3)  badges.add('getting-going');
    if (completedCount >= 6)  badges.add('halfway');
    if (completedCount >= 11) badges.add('angular-pro');
    if (xp >= 100)            badges.add('xp-100');
    if (xp >= 500)            badges.add('xp-500');
    return [...badges];
  }

  private load(): UserProgress {
    if (typeof localStorage === 'undefined') return this.defaults();
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserProgress) : this.defaults();
    } catch {
      return this.defaults();
    }
  }

  private save(p: UserProgress): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(p));
  }

  private defaults(): UserProgress {
    return {
      topics: {},
      totalXp: 0,
      streak: 0,
      lastVisit: new Date().toISOString(),
      badges: [],
    };
  }
}
