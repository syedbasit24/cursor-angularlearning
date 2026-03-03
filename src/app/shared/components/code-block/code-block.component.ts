import { Component, input, signal, computed } from '@angular/core';
import { Language } from '../../models/lesson.model';

/**
 * CodeBlockComponent — renders syntax-highlighted code with a copy button.
 *
 * Angular Concepts demonstrated:
 *  - input() signal-based inputs (multiple props)
 *  - signal() for copy-button state (copied ✓)
 *  - computed() for the highlighted HTML
 *  - [innerHTML] binding to render safe HTML
 *  - Host element with DomSanitizer bypassed via a simple string approach
 */
@Component({
  selector: 'app-code-block',
  imports: [],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent {
  code     = input.required<string>();
  language = input<Language>('typescript');
  filename = input<string>('');
  title    = input<string>('');

  copied = signal(false);

  /** Applies lightweight regex-based syntax highlighting */
  highlightedCode = computed(() => this.highlight(this.code(), this.language()));

  languageLabel = computed(() => {
    const labels: Record<Language, string> = {
      typescript: 'TypeScript',
      html:       'HTML',
      scss:       'SCSS',
      json:       'JSON',
      bash:       'Terminal',
      text:       'Text',
    };
    return labels[this.language()] ?? this.language();
  });

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = this.code();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  private highlight(code: string, lang: Language): string {
    // Escape HTML entities first
    let safe = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (lang === 'bash' || lang === 'text') return safe;

    if (lang === 'html') return this.highlightHtml(safe);
    if (lang === 'json') return this.highlightJson(safe);
    return this.highlightTs(safe); // typescript, scss
  }

  private highlightTs(code: string): string {
    return code
      // Comments (must be first)
      .replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>')
      // Decorators
      .replace(/(@\w+)/g, '<span class="hl-decorator">$1</span>')
      // Strings (single, double, template literals)
      .replace(/(&#39;[^&#]*?&#39;|&quot;[^&]*?&quot;|`[^`]*?`)/g, '<span class="hl-string">$1</span>')
      // Keywords
      .replace(/\b(import|export|from|class|interface|type|const|let|var|function|return|if|else|for|while|switch|case|break|new|extends|implements|abstract|async|await|try|catch|throw|default|enum|in|of|typeof|instanceof|void|null|undefined|true|false|super|this|static|readonly|private|public|protected|override|declare)\b/g,
        '<span class="hl-keyword">$1</span>')
      // Types
      .replace(/\b(string|number|boolean|any|never|unknown|object|symbol|bigint|Array|Promise|Observable|Signal|Component|Injectable|Directive|Pipe|NgModule|Input|Output|EventEmitter)\b/g,
        '<span class="hl-type">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="hl-number">$1</span>');
  }

  private highlightHtml(code: string): string {
    return code
      // Comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>')
      // Attribute values
      .replace(/(=&quot;[^&]*?&quot;)/g, '<span class="hl-string">$1</span>')
      .replace(/(=&#39;[^&#]*?&#39;)/g, '<span class="hl-string">$1</span>')
      // Angular directives / bindings
      .replace(/(\[[\w.]+\]|\([\w.]+\)|\*\w+|#\w+|@\w+)/g, '<span class="hl-decorator">$1</span>')
      // Tags
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-type">$2</span>')
      // Angular interpolation
      .replace(/({{[^}]*}})/g, '<span class="hl-string">$1</span>');
  }

  private highlightJson(code: string): string {
    return code
      .replace(/(&quot;[^&]*?&quot;)\s*:/g, '<span class="hl-type">$1</span>:')
      .replace(/:\s*(&quot;[^&]*?&quot;)/g, ': <span class="hl-string">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="hl-keyword">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
  }
}
