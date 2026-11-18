/**
 * Helpers for working with mock data in CompeteHub.
 * These utilities simulate the behaviour of a real API without a backend.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/**
 * Returns a paginated slice of an array together with pagination metadata.
 *
 * @param items    - Full array of items
 * @param page     - 1-indexed current page
 * @param pageSize - Number of items per page
 */
export function getPaginatedData<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const total = items.length;
  const totalPages = Math.ceil(total / safePageSize);
  const start = (safePage - 1) * safePageSize;
  const data = items.slice(start, start + safePageSize);

  return { data, total, page: safePage, pageSize: safePageSize, totalPages };
}

// ─── Filtering ────────────────────────────────────────────────────────────────

/**
 * Filters an array by its `status` field.
 * Returns the full array when `status` is null or an empty string.
 */
export function filterByStatus<T extends { status: string }>(
  items: T[],
  status: string | null
): T[] {
  if (!status) return items;
  return items.filter((item) => item.status === status);
}

// ─── Search ───────────────────────────────────────────────────────────────────

/**
 * Performs a case-insensitive substring search across the specified fields.
 * Returns the full array when `query` is blank.
 */
export function searchItems<T>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (typeof value === 'string') return value.toLowerCase().includes(q);
      if (typeof value === 'number') return String(value).includes(q);
      return false;
    })
  );
}

// ─── Sorting ──────────────────────────────────────────────────────────────────

/**
 * Returns a new sorted array without mutating the original.
 */
export function sortItems<T>(
  items: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;

    let result: number;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      result = aVal - bVal;
    } else {
      result = String(aVal).localeCompare(String(bVal));
    }

    return direction === 'asc' ? result : -result;
  });
}

// ─── Async Simulation ─────────────────────────────────────────────────────────

/**
 * Returns a Promise that resolves after `ms` milliseconds.
 * Use this to simulate network latency in mock data calls.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
