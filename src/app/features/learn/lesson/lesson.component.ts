import {
  Component, input, signal, computed, inject, OnInit, effect
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LessonService } from '../../../core/services/lesson.service';
import { ProgressService } from '../../../core/services/progress.service';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import {
  Lesson, LessonSection, CodeSection, TextSection,
  NoteSection, DiagramSection
} from '../../../shared/models/lesson.model';

/**
 * LessonComponent — the full lesson page.
 *
 * Angular Concepts demonstrated:
 *  - input() to receive lessonId from route data (via withComponentInputBinding)
 *  - signal() for local reactive state (lesson data, open FAQ items, completed state)
 *  - computed() for derived values
 *  - effect() to re-fetch when lessonId changes
 *  - inject() for DI
 *  - DomSanitizer.bypassSecurityTrustHtml() for safe SVG rendering
 *  - Observable subscription pattern
 *  - @if / @for / @switch new control flow
 */
@Component({
  selector: 'app-lesson',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './lesson.component.html',
})
export class LessonComponent implements OnInit {
  // Route data binding: route data['lessonId'] → this input
  lessonId = input.required<string>();

  private lessonService    = inject(LessonService);
  private progressService  = inject(ProgressService);
  private sanitizer        = inject(DomSanitizer);

  lesson       = signal<Lesson | null>(null);
  loading      = signal(true);
  error        = signal('');
  openFaqIndex = signal<number | null>(null);
  isCompleted  = computed(() =>
    this.lesson() ? this.progressService.isCompleted(this.lesson()!.id) : false
  );
  justCompleted = signal(false);

  // Type-guard helpers for template section rendering
  asText    = (s: LessonSection) => s as TextSection;
  asCode    = (s: LessonSection) => s as CodeSection;
  asNote    = (s: LessonSection) => s as NoteSection;
  asDiagram = (s: LessonSection) => s as DiagramSection;

  constructor() {
    // Re-load lesson whenever the lessonId input changes (route changes)
    effect(() => {
      const id = this.lessonId();
      if (id) this.loadLesson(id);
    });
  }

  ngOnInit(): void {
    this.loadLesson(this.lessonId());
  }

  loadLesson(id: string): void {
    this.loading.set(true);
    this.error.set('');
    this.lesson.set(null);

    this.lessonService.getLesson(id).subscribe({
      next: (lesson) => {
        this.lesson.set(lesson);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(`Lesson "${id}" not found. It will be added soon!`);
        this.loading.set(false);
      },
    });
  }

  toggleFaq(index: number): void {
    this.openFaqIndex.update(i => i === index ? null : index);
  }

  markComplete(): void {
    const l = this.lesson();
    if (!l || this.isCompleted()) return;
    this.progressService.completeTopic(l.id, l.xp);
    this.justCompleted.set(true);
    setTimeout(() => this.justCompleted.set(false), 3000);
  }

  safeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  difficultyColor(d: string): string {
    if (d === 'Beginner')     return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (d === 'Intermediate') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  }

  /** Break multi-paragraph content on \n */
  paragraphs(content: string): string[] {
    return content.split('\n').filter(p => p.trim());
  }
}
