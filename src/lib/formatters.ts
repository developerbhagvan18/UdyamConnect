/**
 * Display formatters for CompeteHub domain types.
 * Each formatter returns a `{ label, color }` pair where `color` is a
 * Tailwind CSS colour name (without prefix) suitable for use with arbitrary
 * colour utilities, e.g. `bg-${color}-100 text-${color}-700`.
 */

import type {
  CompetitionStatus,
  PaymentStatus,
  ParticipationStatus,
  Difficulty,
} from '@/src/types';

// ─── Status display helpers ───────────────────────────────────────────────────

export interface StatusDisplay {
  label: string;
  color: string; // e.g. "green", "red", "blue" — Tailwind palette name
}

export function formatCompetitionStatus(status: CompetitionStatus): StatusDisplay {
  const map: Record<CompetitionStatus, StatusDisplay> = {
    draft:     { label: 'Draft',     color: 'slate'  },
    upcoming:  { label: 'Upcoming',  color: 'blue'   },
    active:    { label: 'Active',    color: 'green'  },
    completed: { label: 'Completed', color: 'purple' },
    cancelled: { label: 'Cancelled', color: 'red'    },
  };
  return map[status] ?? { label: status, color: 'gray' };
}

export function formatPaymentStatus(status: PaymentStatus): StatusDisplay {
  const map: Record<PaymentStatus, StatusDisplay> = {
    pending:   { label: 'Pending',   color: 'amber'  },
    completed: { label: 'Completed', color: 'green'  },
    failed:    { label: 'Failed',    color: 'red'    },
    refunded:  { label: 'Refunded',  color: 'violet' },
  };
  return map[status] ?? { label: status, color: 'gray' };
}

export function formatParticipationStatus(status: ParticipationStatus): StatusDisplay {
  const map: Record<ParticipationStatus, StatusDisplay> = {
    registered:   { label: 'Registered',   color: 'blue'   },
    in_progress:  { label: 'In Progress',  color: 'amber'  },
    completed:    { label: 'Completed',    color: 'green'  },
    disqualified: { label: 'Disqualified', color: 'red'    },
  };
  return map[status] ?? { label: status, color: 'gray' };
}

export function formatDifficulty(difficulty: Difficulty): StatusDisplay {
  const map: Record<Difficulty, StatusDisplay> = {
    easy:   { label: 'Easy',   color: 'green'  },
    medium: { label: 'Medium', color: 'amber'  },
    hard:   { label: 'Hard',   color: 'red'    },
  };
  return map[difficulty] ?? { label: difficulty, color: 'gray' };
}

// ─── Number formatters ────────────────────────────────────────────────────────

/**
 * Formats a number with commas or abbreviates large numbers.
 * 999       → "999"
 * 1_234     → "1,234"
 * 12_300    → "12.3K"
 * 1_200_000 → "1.2M"
 */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 10_000)    return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString('en-IN');
}

/**
 * Formats a duration given in seconds to a human-readable string.
 * 5025 → "1h 23m 45s"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '0s';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return parts.join(' ');
}

/**
 * Returns a human-friendly relative time string.
 * "2 days ago", "just now", etc.
 */
export function formatRelativeTime(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31_536_000, 'year'],
    [2_592_000,  'month'],
    [604_800,    'week'],
    [86_400,     'day'],
    [3_600,      'hour'],
    [60,         'minute'],
    [1,          'second'],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/**
 * Calculates and formats a percentage with one decimal place.
 * formatPercentage(45, 100) → "45.0%"
 */
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}
