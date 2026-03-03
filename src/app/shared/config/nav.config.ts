export interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',    route: '/',         icon: 'home'  },
  {
    label: 'Learn Angular',
    route: '/learn',
    icon: 'book',
    children: [
      { label: 'Angular Basics',  route: '/learn/basics',         icon: 'star'    },
      { label: 'Components',      route: '/learn/components',     icon: 'puzzle'  },
      { label: 'Data Binding',    route: '/learn/data-binding',   icon: 'link'    },
      { label: 'Directives',      route: '/learn/directives',     icon: 'tag'     },
      { label: 'Services & DI',   route: '/learn/services',       icon: 'server'  },
      { label: 'Routing',         route: '/learn/routing',        icon: 'route'   },
      { label: 'Signals',         route: '/learn/signals',        icon: 'signal', badge: 'New' },
      { label: 'RxJS Basics',     route: '/learn/rxjs',           icon: 'refresh' },
      { label: 'Forms',           route: '/learn/forms',          icon: 'form'    },
      { label: 'HTTP',            route: '/learn/http',           icon: 'cloud'   },
      { label: 'Best Practices',  route: '/learn/best-practices', icon: 'check'   },
    ],
  },
  { label: 'Topics',     route: '/topics',     icon: 'grid'     },
  { label: 'Playground', route: '/playground', icon: 'code'     },
  { label: 'AI Helper',  route: '/ai-help',    icon: 'sparkles', badge: 'Beta' },
  { label: 'About',      route: '/about',      icon: 'info'     },
];
