import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface AiResponse {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  codeExample: string | null;
  relatedTopics: string[];
  learnRoute?: string;
}

export interface AiKnowledgeBase {
  defaultResponse: string;
  suggestedQuestions: string[];
  responses: AiResponse[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  codeExample?: string | null;
  relatedTopics?: string[];
  learnRoute?: string;
  timestamp: Date;
  isTyping?: boolean;
}

/**
 * AiService — loads AI knowledge base + performs keyword matching.
 *
 * Angular Concepts demonstrated:
 *  - HttpClient returning Observables
 *  - switchMap() — cancels previous observable if a new one comes in
 *  - signal() caching loaded knowledge base
 *  - Observable of() with delay() to simulate realistic AI "thinking" time
 *  - Pure keyword-matching algorithm (no external AI API needed)
 */
@Injectable({ providedIn: 'root' })
export class AiService {
  private http   = inject(HttpClient);
  private kb     = signal<AiKnowledgeBase | null>(null);
  private loaded = signal(false);

  /** Loads the knowledge base once, returns cached after that */
  private getKnowledgeBase(): Observable<AiKnowledgeBase> {
    const cached = this.kb();
    if (cached) return of(cached);

    return this.http.get<AiKnowledgeBase>('assets/ai-responses.json').pipe(
      map(data => {
        this.kb.set(data);
        this.loaded.set(true);
        return data;
      }),
      catchError(() => {
        const fallback: AiKnowledgeBase = {
          defaultResponse: 'Sorry, I could not load my knowledge base. Please try again.',
          suggestedQuestions: [],
          responses: [],
        };
        return of(fallback);
      }),
    );
  }

  /** Get suggested questions for the welcome screen */
  getSuggestedQuestions(): Observable<string[]> {
    return this.getKnowledgeBase().pipe(
      map(kb => kb.suggestedQuestions),
    );
  }

  /**
   * Find the best matching response for a user query.
   * Algorithm:
   *  1. Normalize both query and keywords to lowercase
   *  2. Score each response: +3 for exact phrase match, +1 per keyword hit
   *  3. Return the highest-scoring response (or default if score < 1)
   *
   * Uses a realistic 800–1400ms delay to simulate AI "thinking"
   */
  ask(userQuery: string): Observable<Omit<ChatMessage, 'id' | 'role' | 'timestamp'>> {
    const thinkingDelay = 800 + Math.random() * 600;

    return this.getKnowledgeBase().pipe(
      switchMap(kb => {
        const result = this.match(userQuery, kb);
        return of(result).pipe(delay(thinkingDelay));
      }),
    );
  }

  private match(query: string, kb: AiKnowledgeBase): Omit<ChatMessage, 'id' | 'role' | 'timestamp'> {
    const q = query.toLowerCase().trim();
    let bestScore  = 0;
    let bestMatch: AiResponse | null = null;

    for (const response of kb.responses) {
      let score = 0;

      for (const keyword of response.keywords) {
        const kw = keyword.toLowerCase();
        if (q.includes(kw)) {
          // Exact phrase match scores higher
          score += kw.split(' ').length > 1 ? 3 : 1;
        }
        // Also check individual words of multi-word keywords
        if (kw.includes(' ')) {
          for (const word of kw.split(' ')) {
            if (q.includes(word) && word.length > 3) score += 0.5;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = response;
      }
    }

    // Need at least a score of 1 to use a match
    if (bestScore >= 1 && bestMatch) {
      return {
        content:       bestMatch.answer,
        codeExample:   bestMatch.codeExample,
        relatedTopics: bestMatch.relatedTopics,
        learnRoute:    bestMatch.learnRoute,
      };
    }

    // Fallback default
    return {
      content:       kb.defaultResponse,
      codeExample:   null,
      relatedTopics: ['Components', 'Signals', 'Services', 'Routing'],
      learnRoute:    '/learn/basics',
    };
  }
}
