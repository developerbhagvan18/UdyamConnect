/**
 * Application-wide constants for CompeteHub
 */

// ─── Brand ───────────────────────────────────────────────────────────────────

export const APP_NAME = 'CompeteHub' as const;
export const APP_TAGLINE = 'Where Champions Are Made' as const;

// ─── Routes ──────────────────────────────────────────────────────────────────

export const ROUTES = {
  // Public
  HOME: '/',
  COMPETITIONS: '/competitions',
  COMPETITION_DETAIL: (id: string) => `/competitions/${id}`,
  VERIFY_CERTIFICATE: '/verify',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // User (authenticated)
  USER_DASHBOARD: '/dashboard',
  USER_COMPETITIONS: '/dashboard/competitions',
  USER_RESULTS: '/dashboard/results',
  USER_CERTIFICATES: '/dashboard/certificates',
  USER_PAYMENTS: '/dashboard/payments',
  USER_REFERRALS: '/dashboard/referrals',
  USER_PROFILE: '/dashboard/profile',
  USER_SETTINGS: '/dashboard/settings',

  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_COMPETITIONS: '/admin/competitions',
  ADMIN_COMPETITION_NEW: '/admin/competitions/new',
  ADMIN_COMPETITION_EDIT: (id: string) => `/admin/competitions/${id}/edit`,
  ADMIN_PARTICIPANTS: '/admin/participants',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_QUESTIONS: '/admin/questions',
  ADMIN_CERTIFICATES: '/admin/certificates',
  ADMIN_USERS: '/admin/users',
  ADMIN_REFERRALS: '/admin/referrals',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// ─── Competition categories ───────────────────────────────────────────────────

export const COMPETITION_CATEGORIES = [
  'Mathematics',
  'Science',
  'Technology',
  'General Knowledge',
  'Programming',
  'Languages',
  'Arts',
  'Sports',
] as const;

export type CompetitionCategory = (typeof COMPETITION_CATEGORIES)[number];

// ─── Status display configs ───────────────────────────────────────────────────

export const COMPETITION_STATUSES = {
  draft:     { label: 'Draft',     color: 'gray'   },
  upcoming:  { label: 'Upcoming',  color: 'blue'   },
  active:    { label: 'Active',    color: 'green'  },
  completed: { label: 'Completed', color: 'purple' },
  cancelled: { label: 'Cancelled', color: 'red'    },
} as const;

// ─── Navigation — public site ─────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Competitions', href: ROUTES.COMPETITIONS },
  { label: 'Verify Certificate', href: ROUTES.VERIFY_CERTIFICATE },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;

// ─── Navigation — admin sidebar ───────────────────────────────────────────────

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard',    href: ROUTES.ADMIN_DASHBOARD,    icon: 'LayoutDashboard' },
  { label: 'Competitions', href: ROUTES.ADMIN_COMPETITIONS, icon: 'Trophy'          },
  { label: 'Questions',    href: ROUTES.ADMIN_QUESTIONS,    icon: 'HelpCircle'      },
  { label: 'Participants', href: ROUTES.ADMIN_PARTICIPANTS, icon: 'Users'           },
  { label: 'Payments',     href: ROUTES.ADMIN_PAYMENTS,     icon: 'CreditCard'      },
  { label: 'Certificates', href: ROUTES.ADMIN_CERTIFICATES, icon: 'Award'           },
  { label: 'Users',        href: ROUTES.ADMIN_USERS,        icon: 'UserCog'         },
  { label: 'Referrals',    href: ROUTES.ADMIN_REFERRALS,    icon: 'Share2'          },
  { label: 'Settings',     href: ROUTES.ADMIN_SETTINGS,     icon: 'Settings'        },
] as const;

// ─── Navigation — user sidebar ────────────────────────────────────────────────

export const USER_NAV_ITEMS = [
  { label: 'Dashboard',    href: ROUTES.USER_DASHBOARD,    icon: 'LayoutDashboard' },
  { label: 'Competitions', href: ROUTES.USER_COMPETITIONS, icon: 'Trophy'          },
  { label: 'My Results',   href: ROUTES.USER_RESULTS,      icon: 'BarChart2'       },
  { label: 'Certificates', href: ROUTES.USER_CERTIFICATES, icon: 'Award'           },
  { label: 'Payments',     href: ROUTES.USER_PAYMENTS,     icon: 'CreditCard'      },
  { label: 'Referrals',    href: ROUTES.USER_REFERRALS,    icon: 'Share2'          },
  { label: 'Profile',      href: ROUTES.USER_PROFILE,      icon: 'User'            },
  { label: 'Settings',     href: ROUTES.USER_SETTINGS,     icon: 'Settings'        },
] as const;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
