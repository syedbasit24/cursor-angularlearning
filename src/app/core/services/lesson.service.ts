import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lesson } from '../../shared/models/lesson.model';

/**
 * LessonService — loads lesson JSON files on demand.
 *
 * Angular Concepts demonstrated:
 *  - HttpClient for loading static JSON assets
 *  - Observable / RxJS pipe(), tap(), catchError()
 *  - signal() to cache loaded lessons in memory
 *  - Injectable service shared across components
 */
@Injectable({ providedIn: 'root' })
export class LessonService {
  private http = inject(HttpClient);

  // In-memory cache: lessonId → Lesson
  private cache = signal<Map<string, Lesson>>(new Map());

  /**
   * Load a lesson by ID from /assets/lessons/<id>.json
   * Returns an Observable<Lesson>. If already cached, returns immediately.
   */
  getLesson(id: string): Observable<Lesson> {
    const cached = this.cache().get(id);
    if (cached) return of(cached);

    return this.http.get<Lesson>(`assets/lessons/${id}.json`).pipe(
      tap(lesson => {
        this.cache.update(map => {
          const next = new Map(map);
          next.set(id, lesson);
          return next;
        });
      }),
      catchError(err => {
        console.error(`Failed to load lesson "${id}":`, err);
        throw err;
      }),
    );
  }
}
