/**
 * Utility functions for CompeteHub
 */

// ─── Class Name Merger ────────────────────────────────────────────────────────

/**
 * Merges class names, filtering out falsy values.
 * Drop-in replacement for clsx without external dependencies.
 */
export function cn(...classes: (string | undefined | null | false | 0)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Currency ─────────────────────────────────────────────────────────────────

/**
 * Formats a number as Indian currency (₹).
 * e.g. 1234 → "₹1,234"
 */
export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Date / Time ──────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string into a readable date.
 * @param date   - ISO date string or Date object
 * @param format - 'short' | 'long' | 'time'
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'time' = 'short'
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: 'short', year: 'numeric' },
    long:  { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' },
    time:  { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };

  return new Intl.DateTimeFormat('en-IN', options[format]).format(d);
}

/**
 * Returns a relative time string such as "2 days ago" or "just now".
 */
export function timeAgo(date: Date | string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000,  'month'],
    [604800,   'week'],
    [86400,    'day'],
    [3600,     'hour'],
    [60,       'minute'],
    [1,        'second'],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

// ─── Text ─────────────────────────────────────────────────────────────────────

/**
 * Truncates a string to maxLength, appending "…" if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/** Alias kept for backwards compatibility */
export const truncate = truncateText;

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string into a URL-safe slug.
 * "National Science Olympiad 2025" → "national-science-olympiad-2025"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Identifiers ──────────────────────────────────────────────────────────────

/**
 * Generates a simple unique ID using timestamp + random suffix.
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Names / Avatars ──────────────────────────────────────────────────────────

/**
 * Extracts initials from a full name (up to 2 characters).
 * "John Doe" → "JD", "Alice" → "A"
 */
export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Deterministically picks an avatar background colour based on a name.
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-indigo-500',
    'bg-violet-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-pink-500',
    'bg-teal-500',
  ];
  if (!name) return colors[0];
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// ─── Numbers ──────────────────────────────────────────────────────────────────

/**
 * Formats a number with locale-aware commas.
 * e.g. 1234567 → "12,34,567"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
