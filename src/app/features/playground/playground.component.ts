import {
  Component, ViewChild, ElementRef, AfterViewInit,
  OnDestroy, signal, computed, inject, effect
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { SNIPPETS, Snippet } from './snippets.data';

// Monaco global type (loaded dynamically from CDN)
declare const monaco: any;
declare const require: any;

/**
 * PlaygroundComponent — embedded Monaco Editor with live preview.
 *
 * Angular Concepts demonstrated:
 *  - AfterViewInit — initialize Monaco after view is ready
 *  - OnDestroy     — clean up Monaco editor instance
 *  - ViewChild     — access the editor DOM container
 *  - DomSanitizer  — safely embed iframe HTML and SVG
 *  - signal()      — reactive UI state
 *  - computed()    — derived state
 *  - effect()      — sync Monaco theme when app theme changes
 *  - Dynamic script loading (CDN pattern)
 */
@Component({
  selector: 'app-playground',
  imports: [FormsModule],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer') editorContainer!: ElementRef<HTMLDivElement>;

  private sanitizer    = inject(DomSanitizer);
  private themeService = inject(ThemeService);

  // Snippet state
  snippets         = SNIPPETS;
  selectedSnippet  = signal<Snippet>(SNIPPETS[0]);
  activeTab        = signal<'preview' | 'console'>('preview');

  // Editor state
  isMonacoLoading  = signal(true);
  isMonacoReady    = signal(false);
  monacoError      = signal('');
  isCopied         = signal(false);

  // Preview panel
  previewHtml      = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.selectedSnippet().preview.iframeHtml)
  );

  // Category list for grouping
  categories = computed(() => [...new Set(SNIPPETS.map(s => s.category))]);

  private editor: any = null;

  constructor() {
    // Sync Monaco editor theme with app dark/light mode
    effect(() => {
      const dark = this.themeService.isDark();
      if (this.isMonacoReady() && (window as any).monaco) {
        monaco.editor.setTheme(dark ? 'vs-dark' : 'vs');
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadMonaco();
  }

  ngOnDestroy(): void {
    this.editor?.dispose();
  }

  /** Dynamically loads Monaco Editor from CDN */
  private loadMonaco(): void {
    if ((window as any).monaco) {
      this.initEditor();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs/loader.js';
    script.onload = () => {
      require.config({
        paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' },
      });
      require(['vs/editor/editor.main'], () => {
        this.initEditor();
      });
    };
    script.onerror = () => {
      this.isMonacoLoading.set(false);
      this.monacoError.set('Could not load Monaco Editor. Please check your internet connection.');
    };
    document.head.appendChild(script);
  }

  private initEditor(): void {
    const snippet = this.selectedSnippet();
    const isDark  = this.themeService.isDark();

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value:              snippet.code,
      language:           snippet.language,
      theme:              isDark ? 'vs-dark' : 'vs',
      fontSize:           13,
      fontFamily:         '"JetBrains Mono", "Fira Code", monospace',
      fontLigatures:      true,
      lineHeight:         22,
      minimap:            { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout:    true,
      wordWrap:           'on',
      padding:            { top: 16, bottom: 16 },
      renderLineHighlight: 'gutter',
      cursorBlinking:     'smooth',
      smoothScrolling:    true,
      contextmenu:        false,
      fixedOverflowWidgets: true,
    });

    this.isMonacoLoading.set(false);
    this.isMonacoReady.set(true);
  }

  selectSnippet(snippet: Snippet): void {
    this.selectedSnippet.set(snippet);

    if (this.editor) {
      const model = monaco.editor.createModel(snippet.code, snippet.language);
      this.editor.setModel(model);
    }

    this.activeTab.set('preview');
  }

  resetCode(): void {
    const original = this.selectedSnippet().code;
    this.editor?.setValue(original);
  }

  async copyCode(): Promise<void> {
    const code = this.editor?.getValue() ?? this.selectedSnippet().code;
    try {
      await navigator.clipboard.writeText(code);
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    } catch {
      // fallback
    }
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  snippetsByCategory(cat: string): Snippet[] {
    return SNIPPETS.filter(s => s.category === cat);
  }
}
