export interface SnippetPreview {
  /** Rendered HTML shown in the iframe preview */
  iframeHtml: string;
  /** Simulated console.log lines */
  consoleLogs: string[];
  /** Angular concepts demonstrated */
  concepts: string[];
}

export interface Snippet {
  id: string;
  label: string;
  category: string;
  description: string;
  language: 'typescript' | 'html' | 'scss';
  code: string;
  preview: SnippetPreview;
}

const PREVIEW_BASE_STYLES = `
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #0f172a;
           color: #e2e8f0; padding: 20px; min-height: 100vh; }
    .component { background: #1e293b; border: 1px solid #334155;
                 border-radius: 12px; padding: 20px; margin-bottom: 12px; }
    .component-label { font-size: 10px; font-weight: 600; color: #64748b;
                        text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    h1 { font-size: 22px; font-weight: 700; color: #f1f5f9; margin-bottom: 6px; }
    h2 { font-size: 16px; font-weight: 600; color: #cbd5e1; margin-bottom: 8px; }
    p  { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 6px; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px;
           border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;
           border: none; transition: all .15s; }
    .btn-primary { background: #DD0031; color: white; }
    .btn-primary:hover { background: #c3002f; }
    .btn-secondary { background: #1e3a5f; color: #60a5fa; border: 1px solid #1d4ed8; }
    .count { font-size: 48px; font-weight: 900; color: #DD0031; text-align: center; padding: 12px 0; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-green { background: #052e16; color: #4ade80; border: 1px solid #166534; }
    .badge-red { background: #450a0a; color: #f87171; border: 1px solid #991b1b; }
    .badge-blue { background: #0c1a2e; color: #60a5fa; border: 1px solid #1d4ed8; }
    .input-row { display: flex; gap: 8px; margin-top: 10px; }
    input { flex: 1; background: #0f172a; border: 1px solid #334155; border-radius: 8px;
            color: #e2e8f0; padding: 8px 12px; font-size: 13px; }
    input:focus { outline: none; border-color: #DD0031; }
    .output { background: #0f172a; border: 1px solid #334155; border-radius: 8px;
              padding: 10px 14px; margin-top: 10px; font-size: 13px; color: #94a3b8; }
    .tag { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 12px;
           background: #1e3a5f; color: #60a5fa; margin: 2px; }
    .divider { height: 1px; background: #334155; margin: 12px 0; }
    .row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .label { font-size: 12px; color: #64748b; min-width: 100px; }
    .value { font-size: 13px; color: #e2e8f0; font-weight: 500; }
    ul { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap-8px; padding: 6px 0;
         border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; }
    li::before { content: '→'; color: #DD0031; margin-right: 8px; }
  </style>
`;

export const SNIPPETS: Snippet[] = [
  {
    id: 'hello-component',
    label: 'Hello Component',
    category: 'Basics',
    description: 'Your very first Angular component with interpolation and a property.',
    language: 'typescript',
    code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  template: \`
    <div class="card">
      <h1>Hello, {{ name }}! 👋</h1>
      <p>Welcome to Angular {{ version }}</p>
      <p>Framework: {{ framework }}</p>
    </div>
  \`,
  styles: [\`
    .card { padding: 24px; border-radius: 12px; background: #1e293b; }
    h1 { color: #DD0031; font-size: 24px; margin-bottom: 8px; }
    p  { color: #94a3b8; margin: 4px 0; }
  \`]
})
export class HelloComponent {
  name      = 'Developer';
  version   = 21;
  framework = 'Angular';
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <div class="component">
          <div class="component-label">app-hello renders →</div>
          <h1>Hello, Developer! 👋</h1>
          <p>Welcome to Angular 21</p>
          <p>Framework: Angular</p>
        </div>`,
      consoleLogs: [],
      concepts: ['@Component decorator', 'selector', 'template', 'Interpolation {{ }}', 'Class properties'],
    },
  },

  {
    id: 'signal-counter',
    label: 'Signal Counter',
    category: 'Signals',
    description: 'A reactive counter using signal(), computed(), and update().',
    language: 'typescript',
    code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="card">
      <h2>⚡ Signal Counter</h2>

      <p class="count">{{ count() }}</p>

      <div class="actions">
        <button (click)="decrement()">−</button>
        <button (click)="reset()">Reset</button>
        <button (click)="increment()">+</button>
      </div>

      <p>Double: {{ doubled() }}</p>
      <p>Status: {{ status() }}</p>
    </div>
  \`,
})
export class CounterComponent {
  // signal() — reactive value
  count = signal(0);

  // computed() — derived, read-only
  doubled = computed(() => count() * 2);
  status  = computed(() =>
    count() > 0 ? 'Positive' :
    count() < 0 ? 'Negative' : 'Zero'
  );

  increment() { this.count.update(n => n + 1); }
  decrement() { this.count.update(n => n - 1); }
  reset()     { this.count.set(0); }
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <div class="component">
          <div class="component-label">app-counter renders →</div>
          <h2>⚡ Signal Counter</h2>
          <div class="count" id="cnt">0</div>
          <div style="display:flex;gap:10px;justify-content:center;margin:12px 0">
            <button class="btn btn-secondary" onclick="change(-1)">−</button>
            <button class="btn btn-secondary" onclick="reset()">Reset</button>
            <button class="btn btn-primary" onclick="change(1)">+</button>
          </div>
          <p>Double: <span id="dbl">0</span></p>
          <p>Status: <span id="sts">Zero</span></p>
        </div>
        <script>
          let c=0;
          function change(n){c+=n;update()}
          function reset(){c=0;update()}
          function update(){
            document.getElementById('cnt').textContent=c;
            document.getElementById('dbl').textContent=c*2;
            document.getElementById('sts').textContent=c>0?'Positive':c<0?'Negative':'Zero';
          }
        </script>`,
      consoleLogs: ['signal(0) → initial value: 0', 'count.update(n => n + 1) → 1', 'doubled() → 2 (auto-computed)'],
      concepts: ['signal()', 'computed()', 'update()', 'set()', 'Event Binding (click)'],
    },
  },

  {
    id: 'effect-demo',
    label: 'Signal Effect',
    category: 'Signals',
    description: 'Using effect() to run side-effects when signals change.',
    language: 'typescript',
    code: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-effect-demo',
  standalone: true,
  template: \`
    <div>
      <h2>🔁 Effect Demo</h2>
      <input [value]="name()" (input)="name.set($event.target.value)"
             placeholder="Type your name..." />
      <p>Hello, <strong>{{ name() }}</strong>!</p>
      <p>Length: {{ length() }} characters</p>
      <p>Check the console for effect() logs ↓</p>
    </div>
  \`,
})
export class EffectDemoComponent {
  name   = signal('Angular');
  length = computed(() => this.name().length);

  constructor() {
    // effect() runs whenever name signal changes
    effect(() => {
      console.log('Name changed to:', this.name());
      console.log('Character count:', this.length());
    });
  }
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <div class="component">
          <div class="component-label">app-effect-demo renders →</div>
          <h2 style="margin-bottom:12px">🔁 Effect Demo</h2>
          <div class="input-row">
            <input id="inp" value="Angular" oninput="update(this.value)" placeholder="Type your name..."/>
          </div>
          <div class="output" style="margin-top:12px">
            Hello, <strong id="nm" style="color:#DD0031">Angular</strong>!<br>
            Length: <span id="ln">7</span> characters
          </div>
        </div>
        <script>
          function update(v){
            document.getElementById('nm').textContent=v||'...';
            document.getElementById('ln').textContent=v.length;
          }
        </script>`,
      consoleLogs: [
        '→ effect() runs on init:',
        '  Name changed to: Angular',
        '  Character count: 7',
        '→ After typing "A":',
        '  Name changed to: A',
        '  Character count: 1',
      ],
      concepts: ['effect()', 'signal()', 'computed()', 'Property Binding [value]', 'Event Binding (input)'],
    },
  },

  {
    id: 'control-flow',
    label: '@if and @for',
    category: 'Directives',
    description: 'Angular 17+ new control flow: @if, @for, @empty — no more *ngIf/*ngFor!',
    language: 'typescript',
    code: `import { Component, signal } from '@angular/core';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  template: \`
    <div>
      <h2>📋 Task List</h2>

      <!-- @if / @else — replaces *ngIf -->
      @if (tasks().length === 0) {
        <p class="empty">No tasks yet. Add one!</p>
      } @else {
        <!-- @for — replaces *ngFor; track is required -->
        @for (task of tasks(); track task.id) {
          <div class="task" [class.done]="task.done">
            <input type="checkbox" [(ngModel)]="task.done" />
            <span>{{ task.text }}</span>
          </div>
        }
      }

      <!-- @empty inside @for — shown when list is empty -->
      <p>Total: {{ tasks().length }} tasks</p>
    </div>
  \`,
})
export class TasksComponent {
  tasks = signal<Task[]>([
    { id: 1, text: 'Learn Angular Signals', done: true  },
    { id: 2, text: 'Build a component',     done: false },
    { id: 3, text: 'Use @for loop',          done: false },
  ]);
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          .task{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #1e293b;font-size:13px;}
          .task.done span{text-decoration:line-through;color:#64748b;}
          input[type=checkbox]{accent-color:#DD0031;}
        </style>
        <div class="component">
          <div class="component-label">app-tasks renders →</div>
          <h2 style="margin-bottom:12px">📋 Task List</h2>
          <div class="task done"><input type="checkbox" checked /><span>Learn Angular Signals</span></div>
          <div class="task"><input type="checkbox" /><span>Build a component</span></div>
          <div class="task"><input type="checkbox" /><span>Use @for loop</span></div>
          <p style="margin-top:12px;color:#64748b;font-size:13px">Total: 3 tasks</p>
        </div>`,
      consoleLogs: [],
      concepts: ['@if / @else new control flow', '@for with track', 'signal() with array', 'Class Binding [class.done]'],
    },
  },

  {
    id: 'input-output',
    label: 'Input & Output',
    category: 'Components',
    description: 'Modern signal-based input() and output() for parent-child communication.',
    language: 'typescript',
    code: `import { Component, input, output, signal } from '@angular/core';

// ── Child Component ──────────────────────────────────────
@Component({
  selector: 'app-badge',
  standalone: true,
  template: \`
    <div class="badge">
      <span>{{ label() }}</span>
      <button (click)="remove.emit(label())">✕</button>
    </div>
  \`,
})
export class BadgeComponent {
  // input() — signal-based (Angular 17+)
  label = input.required<string>();

  // output() — replaces @Output() + EventEmitter
  remove = output<string>();
}

// ── Parent Component ─────────────────────────────────────
@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [BadgeComponent],
  template: \`
    <h2>🏷️ Tags</h2>
    @for (tag of tags(); track tag) {
      <app-badge [label]="tag" (remove)="removeTag($event)" />
    }
  \`,
})
export class TagsComponent {
  tags = signal(['Angular', 'TypeScript', 'Signals', 'Standalone']);

  removeTag(tag: string) {
    this.tags.update(list => list.filter(t => t !== tag));
  }
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          .tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}
          .tag-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;
                     background:#1e3a5f;color:#60a5fa;border:1px solid #1d4ed8;
                     border-radius:20px;font-size:12px;font-weight:600;}
          .tag-badge button{background:none;border:none;color:#60a5fa;cursor:pointer;
                            font-size:13px;padding:0;line-height:1;}
          .tag-badge button:hover{color:#f87171;}
        </style>
        <div class="component">
          <div class="component-label">app-tags → app-badge renders →</div>
          <h2 style="margin-bottom:2px">🏷️ Tags</h2>
          <div class="tag-row" id="tags"></div>
        </div>
        <script>
          const tags=['Angular','TypeScript','Signals','Standalone'];
          function render(){
            const c=document.getElementById('tags');
            c.innerHTML=tags.map(t=>\`<span class="tag-badge">\${t}<button onclick="remove('\${t}')">✕</button></span>\`).join('');
          }
          function remove(t){tags.splice(tags.indexOf(t),1);render();}
          render();
        </script>`,
      consoleLogs: ['[app-badge] remove.emit("Angular")', '[app-tags] removeTag("Angular") → filter'],
      concepts: ['input() signal-based', 'output() signal-based', 'input.required<T>()', 'Parent→Child data flow', 'Child→Parent events'],
    },
  },

  {
    id: 'service-pattern',
    label: 'Service + Signal State',
    category: 'Services',
    description: 'A shared service holding state with signals — injected via inject().',
    language: 'typescript',
    code: `import { Injectable, signal, computed, inject } from '@angular/core';
import { Component } from '@angular/core';

// ── Shared Service ───────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<string[]>([]);

  count = computed(() => this.items().length);
  isEmpty = computed(() => this.items().length === 0);

  add(item: string)    { this.items.update(l => [...l, item]); }
  remove(item: string) { this.items.update(l => l.filter(i => i !== item)); }
  clear()              { this.items.set([]); }

  getItems() { return this.items; }
}

// ── Component A: Product List ─────────────────────────────
@Component({
  selector: 'app-products',
  standalone: true,
  template: \`
    @for (p of products; track p) {
      <div class="product">
        <span>{{ p }}</span>
        <button (click)="cart.add(p)">Add to Cart</button>
      </div>
    }
  \`,
})
export class ProductsComponent {
  cart = inject(CartService);
  products = ['Angular Book', 'TypeScript Guide', 'RxJS Cookbook'];
}

// ── Component B: Cart (shares same CartService instance!) ─
@Component({
  selector: 'app-cart',
  standalone: true,
  template: \`
    <h3>🛒 Cart ({{ cart.count() }} items)</h3>
    @if (cart.isEmpty()) {
      <p>Your cart is empty</p>
    }
  \`,
})
export class CartComponent {
  cart = inject(CartService);
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          .product{display:flex;justify-content:space-between;align-items:center;
                   padding:8px 0;border-bottom:1px solid #334155;font-size:13px;}
        </style>
        <div class="component">
          <div class="component-label">app-products →</div>
          <div class="product"><span>Angular Book</span><button class="btn btn-primary" style="padding:4px 10px;font-size:11px" onclick="add('Angular Book')">Add to Cart</button></div>
          <div class="product"><span>TypeScript Guide</span><button class="btn btn-primary" style="padding:4px 10px;font-size:11px" onclick="add('TypeScript Guide')">Add to Cart</button></div>
          <div class="product"><span>RxJS Cookbook</span><button class="btn btn-primary" style="padding:4px 10px;font-size:11px" onclick="add('RxJS Cookbook')">Add to Cart</button></div>
        </div>
        <div class="component" style="margin-top:10px">
          <div class="component-label">app-cart (same CartService!) →</div>
          <h2>🛒 Cart (<span id="cnt">0</span> items)</h2>
          <p id="empty" style="color:#64748b;font-size:13px">Your cart is empty</p>
          <ul id="list" style="margin-top:8px"></ul>
        </div>
        <script>
          const cart=[];
          function add(i){if(!cart.includes(i)){cart.push(i);render();}}
          function render(){
            document.getElementById('cnt').textContent=cart.length;
            document.getElementById('empty').style.display=cart.length?'none':'block';
            document.getElementById('list').innerHTML=cart.map(i=>\`<li>\${i}</li>\`).join('');
          }
        </script>`,
      consoleLogs: ['CartService instantiated (singleton)', 'cart.add("Angular Book")', 'count() → 1 (computed auto-updated)'],
      concepts: ['@Injectable providedIn: root', 'inject()', 'signal() shared state', 'computed() derived state', 'Singleton service pattern'],
    },
  },

  {
    id: 'two-way-binding',
    label: 'Two-Way Binding',
    category: 'Data Binding',
    description: 'All 4 types of data binding: interpolation, property, event, and two-way.',
    language: 'typescript',
    code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding-demo',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <!-- 1. Interpolation {{ }} -->
    <h1>Hello, {{ name() }}!</h1>

    <!-- 2. Property Binding [prop] -->
    <button [disabled]="name().length === 0">
      Submit (disabled when empty)
    </button>

    <!-- 3. Event Binding (event) -->
    <button (click)="onGreet()">Greet</button>
    <p>Clicked: {{ clickCount() }} times</p>

    <!-- 4. Two-Way Binding [(ngModel)] -->
    <input [(ngModel)]="nameValue" placeholder="Type here..." />
    <p>Live preview: {{ nameValue }}</p>
  \`,
})
export class BindingDemoComponent {
  name       = signal('Angular');
  clickCount = signal(0);
  nameValue  = 'Angular';  // used with ngModel

  onGreet() {
    this.clickCount.update(n => n + 1);
    alert(\`Hello, \${this.name()}!\`);
  }
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          .binding-row{display:flex;align-items:center;gap:8px;margin:8px 0;font-size:13px;}
          .binding-type{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;
                        padding:2px 8px;border-radius:4px;background:#1e293b;color:#64748b;}
        </style>
        <div class="component">
          <div class="component-label">app-binding-demo renders →</div>
          <div class="binding-row"><span class="binding-type">① Interpolation</span><h2 id="h">Hello, Angular!</h2></div>
          <div class="binding-row"><span class="binding-type">② Property</span>
            <button class="btn btn-primary" id="submitBtn">Submit</button></div>
          <div class="binding-row"><span class="binding-type">③ Event</span>
            <button class="btn btn-secondary" onclick="greet()">Greet</button>
            <span>Clicked: <strong id="cc">0</strong> times</span></div>
          <div class="binding-row"><span class="binding-type">④ Two-way</span>
            <input oninput="twoWay(this.value)" value="Angular" style="width:160px"/></div>
          <p id="live" style="margin-top:6px;color:#DD0031">Live preview: Angular</p>
        </div>
        <script>
          let cc=0;
          function greet(){cc++;document.getElementById('cc').textContent=cc;}
          function twoWay(v){
            document.getElementById('live').textContent='Live preview: '+v;
            document.getElementById('h').textContent='Hello, '+v+'!';
            document.getElementById('submitBtn').disabled=v.length===0;
          }
        </script>`,
      consoleLogs: ['① {{ name() }} → "Angular"', '② [disabled]="name().length === 0" → false', '③ (click)="onGreet()" fired', '④ [(ngModel)] syncs both ways'],
      concepts: ['Interpolation {{ }}', 'Property Binding [prop]', 'Event Binding (event)', 'Two-way Binding [(ngModel)]', 'FormsModule'],
    },
  },

  {
    id: 'reactive-form',
    label: 'Reactive Form',
    category: 'Forms',
    description: 'A login form using FormBuilder, Validators, and reactive forms.',
    language: 'typescript',
    code: `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>Login Form</h2>

      <label>Email</label>
      <input formControlName="email" type="email" />
      @if (form.get('email')?.touched && form.get('email')?.invalid) {
        <span class="error">Valid email required</span>
      }

      <label>Password</label>
      <input formControlName="password" type="password" />
      @if (form.get('password')?.touched && form.get('password')?.invalid) {
        <span class="error">Minimum 8 characters</span>
      }

      <button type="submit" [disabled]="form.invalid">
        {{ form.invalid ? 'Fill the form' : 'Sign In ✓' }}
      </button>

      <p>Form valid: {{ form.valid }}</p>
      <p>Status: {{ form.status }}</p>
    </form>
  \`,
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          label{display:block;font-size:12px;color:#64748b;margin:12px 0 4px;font-weight:500;}
          input{width:100%;background:#0f172a;border:1px solid #334155;border-radius:8px;
                color:#e2e8f0;padding:8px 12px;font-size:13px;margin-bottom:2px;}
          input:focus{outline:none;border-color:#DD0031;}
          input.error-input{border-color:#ef4444;}
          .error{color:#f87171;font-size:11px;display:block;margin-bottom:4px;}
          button{margin-top:12px;}
          .meta{margin-top:10px;font-size:12px;color:#64748b;}
          .meta span.valid{color:#4ade80;} .meta span.invalid{color:#f87171;}
        </style>
        <div class="component">
          <div class="component-label">app-login renders →</div>
          <h2 style="margin-bottom:4px">Login Form</h2>
          <label>Email</label>
          <input id="email" type="email" oninput="validate()" placeholder="you@example.com"/>
          <span class="error" id="emailErr" style="display:none">Valid email required</span>
          <label>Password</label>
          <input id="pass" type="password" oninput="validate()" placeholder="Min 8 characters"/>
          <span class="error" id="passErr" style="display:none">Minimum 8 characters</span>
          <button class="btn btn-primary" id="submitBtn" onclick="submit()" disabled>Fill the form</button>
          <div class="meta">
            Form valid: <span id="valid" class="invalid">false</span> |
            Status: <span id="status">INVALID</span>
          </div>
        </div>
        <script>
          function validate(){
            const e=document.getElementById('email').value;
            const p=document.getElementById('pass').value;
            const emailOk=/^[^@]+@[^@]+\.[^@]+$/.test(e);
            const passOk=p.length>=8;
            document.getElementById('emailErr').style.display=e&&!emailOk?'block':'none';
            document.getElementById('passErr').style.display=p&&!passOk?'block':'none';
            const ok=emailOk&&passOk;
            document.getElementById('submitBtn').disabled=!ok;
            document.getElementById('submitBtn').textContent=ok?'Sign In ✓':'Fill the form';
            document.getElementById('valid').textContent=ok?'true':'false';
            document.getElementById('valid').className=ok?'valid':'invalid';
            document.getElementById('status').textContent=ok?'VALID':'INVALID';
          }
          function submit(){alert('Form submitted! Check console.');}
        </script>`,
      consoleLogs: ['Form submitted: { email: "user@mail.com", password: "secret123" }', 'form.valid → true', 'form.status → "VALID"'],
      concepts: ['FormBuilder', 'FormGroup', 'FormControl', 'Validators.required', 'Validators.email', 'Validators.minLength', 'ReactiveFormsModule'],
    },
  },

  {
    id: 'pipe-demo',
    label: 'Custom Pipe',
    category: 'Pipes',
    description: 'Create a custom standalone pipe to transform data in templates.',
    language: 'typescript',
    code: `import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

// ── Custom Pipe ──────────────────────────────────────────
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 30, suffix = '...'): string {
    if (!value) return '';
    return value.length > limit
      ? value.substring(0, limit) + suffix
      : value;
  }
}

// ── Component using built-in + custom pipes ──────────────
@Component({
  selector: 'app-pipe-demo',
  standalone: true,
  imports: [TruncatePipe, DatePipe, UpperCasePipe, CurrencyPipe],
  template: \`
    <p>{{ title | truncate:20 }}</p>
    <p>{{ title | truncate:10:'…' }}</p>

    <p>{{ today | date:'longDate' }}</p>
    <p>{{ 'angular' | uppercase }}</p>
    <p>{{ price | currency:'USD' }}</p>
  \`,
})
export class PipeDemoComponent {
  title = 'The complete Angular learning platform';
  today = new Date();
  price = 49.99;
}`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <div class="component">
          <div class="component-label">app-pipe-demo renders →</div>
          <div class="row"><span class="label">truncate:20</span><span class="value">"The complete Angular..."</span></div>
          <div class="row"><span class="label">truncate:10:'…'</span><span class="value">"The comple…"</span></div>
          <div class="divider"></div>
          <div class="row"><span class="label">date:'longDate'</span><span class="value">February 24, 2026</span></div>
          <div class="row"><span class="label">uppercase</span><span class="value">ANGULAR</span></div>
          <div class="row"><span class="label">currency:'USD'</span><span class="value">$49.99</span></div>
        </div>`,
      consoleLogs: [],
      concepts: ['@Pipe decorator', 'PipeTransform interface', 'transform() method', 'Pipe arguments (:)', 'Standalone pipe'],
    },
  },

  {
    id: 'routing-example',
    label: 'Routing Setup',
    category: 'Routing',
    description: 'Setting up Angular Router with lazy loading and route params.',
    language: 'typescript',
    code: `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Static route — loads immediately
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
    title: 'Home',
  },

  // Route with URL parameter (:id)
  {
    path: 'lesson/:id',
    loadComponent: () =>
      import('./lesson/lesson.component').then(m => m.LessonComponent),
    title: 'Lesson',
  },

  // Nested routes with a layout shell
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./shell/shell.component').then(m => m.ShellComponent),
    children: [
      { path: 'stats',    loadComponent: () => import('./stats.component')   },
      { path: 'settings', loadComponent: () => import('./settings.component') },
    ],
  },

  // Redirect
  { path: 'home', redirectTo: '' },

  // 404 catch-all (must be last!)
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(), // route params → component inputs
      withViewTransitions(),        // smooth page transitions
    ),
  ],
};`,
    preview: {
      iframeHtml: `${PREVIEW_BASE_STYLES}
        <style>
          .route{display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid #1e293b;}
          .method{font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;background:#1e3a5f;color:#60a5fa;min-width:60px;text-align:center;font-family:monospace;}
          .path{color:#e2e8f0;font-family:monospace;font-size:13px;}
          .desc{color:#64748b;font-size:11px;margin-top:2px;}
        </style>
        <div class="component">
          <div class="component-label">Route table →</div>
          <div class="route"><div><div class="method">GET</div></div><div><div class="path">/</div><div class="desc">HomeComponent (lazy)</div></div></div>
          <div class="route"><div><div class="method">GET</div></div><div><div class="path">/lesson/:id</div><div class="desc">LessonComponent — :id as signal input</div></div></div>
          <div class="route"><div><div class="method">GET</div></div><div><div class="path">/dashboard/*</div><div class="desc">ShellComponent + nested children</div></div></div>
          <div class="route"><div><div class="method">301</div></div><div><div class="path">/home → /</div><div class="desc">Redirect</div></div></div>
          <div class="route"><div><div class="method" style="background:#450a0a;color:#f87171">404</div></div><div><div class="path">/**</div><div class="desc">NotFoundComponent (catch-all)</div></div></div>
        </div>`,
      consoleLogs: ['Router: navigating to "/lesson/signals"', 'Lazy loading: lesson.component.ts', 'withComponentInputBinding: id = "signals"'],
      concepts: ['loadComponent() lazy loading', 'Route parameters :id', 'Nested routes (children)', 'withComponentInputBinding()', 'withViewTransitions()', 'Catch-all route **'],
    },
  },
];
