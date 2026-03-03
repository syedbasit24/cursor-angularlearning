export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Category   = 'Core Angular' | 'State Management' | 'Architecture' | 'Navigation' | 'Reactive' | 'User Input' | 'Data';

export interface TopicTag {
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'pink';
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  /** Gradient CSS class pair: from-X to-Y */
  gradient: string;
  difficulty: Difficulty;
  category: Category;
  xp: number;
  estimatedMinutes: number;
  tags: TopicTag[];
  route: string;
  isNew?: boolean;
  prerequisites?: string[];
  /** Concepts briefly listed */
  keyPoints: string[];
}

export const TOPICS: Topic[] = [
  {
    id: 'basics',
    title: 'Angular Basics',
    subtitle: 'Start your Angular journey',
    description:
      'Understand what Angular is, how it works, and set up your first project. Learn about the Angular CLI, modules, bootstrapping, and the overall application architecture.',
    icon: '🚀',
    gradient: 'from-red-500 to-orange-500',
    difficulty: 'Beginner',
    category: 'Core Angular',
    xp: 100,
    estimatedMinutes: 20,
    tags: [
      { label: 'CLI', color: 'blue' },
      { label: 'Bootstrapping', color: 'green' },
      { label: 'Architecture', color: 'purple' },
    ],
    route: '/learn/basics',
    keyPoints: [
      'What is Angular and why use it',
      'Angular CLI setup and commands',
      'Project structure explained',
      'Bootstrapping with bootstrapApplication()',
      'Standalone vs NgModule approach',
    ],
  },

  {
    id: 'components',
    title: 'Components',
    subtitle: 'The building blocks of Angular',
    description:
      'Master Angular components — the fundamental UI building blocks. Learn @Component decorator, templates, styles, lifecycle hooks, and how components communicate.',
    icon: '🧩',
    gradient: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    category: 'Core Angular',
    xp: 120,
    estimatedMinutes: 25,
    tags: [
      { label: '@Component', color: 'blue' },
      { label: 'Lifecycle', color: 'green' },
      { label: 'Standalone', color: 'orange' },
    ],
    route: '/learn/components',
    keyPoints: [
      '@Component decorator deep dive',
      'Template and inline styles',
      'Lifecycle hooks (ngOnInit, ngOnDestroy)',
      'input() and output() signals',
      'ViewChild and ContentChild',
    ],
  },

  {
    id: 'data-binding',
    title: 'Data Binding',
    subtitle: 'Connect your data to the view',
    description:
      'Learn all 4 types of Angular data binding: interpolation, property binding, event binding, and two-way binding. Understand the difference and when to use each.',
    icon: '🔗',
    gradient: 'from-green-500 to-teal-500',
    difficulty: 'Beginner',
    category: 'Core Angular',
    xp: 110,
    estimatedMinutes: 20,
    tags: [
      { label: 'Interpolation', color: 'green' },
      { label: 'Property Binding', color: 'blue' },
      { label: 'Event Binding', color: 'orange' },
      { label: 'Two-Way', color: 'purple' },
    ],
    route: '/learn/data-binding',
    keyPoints: [
      'Interpolation {{ expression }}',
      'Property binding [prop]="value"',
      'Event binding (click)="handler()"',
      'Two-way binding [(ngModel)]',
      'Template reference variables #ref',
    ],
  },

  {
    id: 'directives',
    title: 'Directives',
    subtitle: 'Supercharge your templates',
    description:
      'Explore Angular directives — the new @if, @for, @switch control flow syntax plus built-in and custom attribute directives. Learn when to use each.',
    icon: '🎯',
    gradient: 'from-purple-500 to-violet-500',
    difficulty: 'Intermediate',
    category: 'Core Angular',
    xp: 130,
    estimatedMinutes: 30,
    tags: [
      { label: '@if / @for', color: 'purple' },
      { label: '@switch', color: 'blue' },
      { label: 'Custom', color: 'green' },
    ],
    route: '/learn/directives',
    keyPoints: [
      'New @if / @else control flow (Angular 17+)',
      '@for with track for performance',
      '@switch / @case blocks',
      'Attribute directives with HostListener',
      'Structural directive concepts',
    ],
  },

  {
    id: 'services',
    title: 'Services & DI',
    subtitle: 'Share logic and data across components',
    description:
      'Master Angular services and Dependency Injection. Learn how to create singleton services, inject them with inject(), and share state across your application.',
    icon: '⚙️',
    gradient: 'from-yellow-500 to-amber-500',
    difficulty: 'Intermediate',
    category: 'Architecture',
    xp: 150,
    estimatedMinutes: 35,
    tags: [
      { label: '@Injectable', color: 'orange' },
      { label: 'inject()', color: 'blue' },
      { label: 'Singleton', color: 'green' },
    ],
    route: '/learn/services',
    keyPoints: [
      '@Injectable({ providedIn: "root" })',
      'inject() vs constructor injection',
      'Service as single source of truth',
      'Providing services at different levels',
      'Tree-shakable providers',
    ],
  },

  {
    id: 'routing',
    title: 'Routing',
    subtitle: 'Navigate between pages',
    description:
      'Build a multi-page Angular app with the powerful Angular Router. Learn lazy loading, route guards, route parameters, nested routes, and more.',
    icon: '🗺️',
    gradient: 'from-cyan-500 to-blue-500',
    difficulty: 'Intermediate',
    category: 'Navigation',
    xp: 160,
    estimatedMinutes: 40,
    tags: [
      { label: 'Lazy Loading', color: 'blue' },
      { label: 'Guards', color: 'orange' },
      { label: 'Params', color: 'green' },
    ],
    route: '/learn/routing',
    keyPoints: [
      'provideRouter() configuration',
      'Lazy loading with loadComponent()',
      'Route parameters and withComponentInputBinding()',
      'Route guards (CanActivate)',
      'Nested routes and router outlets',
    ],
  },

  {
    id: 'signals',
    title: 'Signals',
    subtitle: 'The future of Angular reactivity',
    description:
      'Angular Signals are the modern way to manage reactive state. Learn signal(), computed(), effect() and understand how they replace complex RxJS patterns for UI state.',
    icon: '⚡',
    gradient: 'from-pink-500 to-rose-500',
    difficulty: 'Intermediate',
    category: 'State Management',
    xp: 180,
    estimatedMinutes: 35,
    isNew: true,
    tags: [
      { label: 'signal()', color: 'pink' },
      { label: 'computed()', color: 'purple' },
      { label: 'effect()', color: 'blue' },
    ],
    route: '/learn/signals',
    keyPoints: [
      'signal() — reactive primitive',
      'computed() — derived read-only state',
      'effect() — side-effect on change',
      'set(), update(), mutate()',
      'Signal inputs: input() and input.required()',
    ],
  },

  {
    id: 'rxjs',
    title: 'RxJS Basics',
    subtitle: 'Reactive programming with streams',
    description:
      'Learn RxJS — the reactive programming library at the core of Angular. Understand Observables, Subjects, and the most useful operators for HTTP, events, and state.',
    icon: '🌊',
    gradient: 'from-indigo-500 to-purple-500',
    difficulty: 'Intermediate',
    category: 'Reactive',
    xp: 170,
    estimatedMinutes: 45,
    tags: [
      { label: 'Observable', color: 'purple' },
      { label: 'Operators', color: 'blue' },
      { label: 'Subject', color: 'green' },
    ],
    route: '/learn/rxjs',
    prerequisites: ['services'],
    keyPoints: [
      'Observable vs Promise vs Signal',
      'map, filter, switchMap, mergeMap',
      'Subject and BehaviorSubject',
      'takeUntilDestroyed()',
      'async pipe in templates',
    ],
  },

  {
    id: 'forms',
    title: 'Forms',
    subtitle: 'Collect and validate user input',
    description:
      'Build powerful forms with Angular. Learn Template-driven forms with ngModel and Reactive forms with FormBuilder — plus validation, error messages, and custom validators.',
    icon: '📝',
    gradient: 'from-emerald-500 to-green-500',
    difficulty: 'Intermediate',
    category: 'User Input',
    xp: 150,
    estimatedMinutes: 40,
    tags: [
      { label: 'Reactive Forms', color: 'blue' },
      { label: 'Template-driven', color: 'green' },
      { label: 'Validators', color: 'orange' },
    ],
    route: '/learn/forms',
    keyPoints: [
      'Template-driven with [(ngModel)]',
      'ReactiveFormsModule and FormBuilder',
      'Built-in validators (required, email, minLength)',
      'Custom validators and async validators',
      'FormArray for dynamic lists',
    ],
  },

  {
    id: 'http',
    title: 'HTTP Client',
    subtitle: 'Fetch data from APIs',
    description:
      'Connect your Angular app to real APIs using HttpClient. Learn GET, POST, PUT, DELETE requests, HTTP interceptors, error handling, and loading state patterns.',
    icon: '🌐',
    gradient: 'from-orange-500 to-red-500',
    difficulty: 'Intermediate',
    category: 'Data',
    xp: 160,
    estimatedMinutes: 40,
    tags: [
      { label: 'HttpClient', color: 'orange' },
      { label: 'Interceptors', color: 'blue' },
      { label: 'Error Handling', color: 'red' },
    ],
    route: '/learn/http',
    prerequisites: ['services', 'rxjs'],
    keyPoints: [
      'provideHttpClient() setup',
      'GET, POST, PUT, DELETE methods',
      'HTTP interceptors (auth, logging)',
      'Error handling with catchError',
      'Loading state with signals',
    ],
  },

  {
    id: 'best-practices',
    title: 'Best Practices',
    subtitle: 'Write production-ready Angular',
    description:
      'Level up your Angular with proven patterns: OnPush change detection, smart/dumb components, folder structure, performance optimization, and accessibility.',
    icon: '🏆',
    gradient: 'from-slate-600 to-gray-700',
    difficulty: 'Advanced',
    category: 'Architecture',
    xp: 200,
    estimatedMinutes: 50,
    tags: [
      { label: 'Performance', color: 'purple' },
      { label: 'OnPush', color: 'blue' },
      { label: 'Patterns', color: 'green' },
    ],
    route: '/learn/best-practices',
    prerequisites: ['signals', 'services', 'routing'],
    keyPoints: [
      'OnPush change detection strategy',
      'Smart vs Dumb components pattern',
      'Feature-based folder structure',
      'trackBy in @for loops',
      'Accessibility (a11y) basics',
    ],
  },
];

export const CATEGORIES: Category[] = [
  'Core Angular',
  'State Management',
  'Architecture',
  'Navigation',
  'Reactive',
  'User Input',
  'Data',
];

export const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; bg: string; dot: string }> = {
  Beginner:     { color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20',  dot: 'bg-green-400' },
  Intermediate: { color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20',    dot: 'bg-blue-400'  },
  Advanced:     { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', dot: 'bg-purple-400' },
};

export const TAG_COLOR_CONFIG: Record<TopicTag['color'], string> = {
  blue:   'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green:  'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  red:    'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  pink:   'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
};
