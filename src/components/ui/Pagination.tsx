'use client';

import React, { useMemo } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  pageSize?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildPageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '…')[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) pages.push('…');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('…');

  // Always show last page
  pages.push(total);

  return pages;
}

// ---------------------------------------------------------------------------
// Pagination Component
// ---------------------------------------------------------------------------

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  totalItems,
  pageSize,
}: PaginationProps) {
  const pages = useMemo(() => buildPageList(currentPage, totalPages), [currentPage, totalPages]);

  const startItem =
    showInfo && totalItems !== undefined && pageSize !== undefined
      ? (currentPage - 1) * pageSize + 1
      : null;
  const endItem =
    startItem !== null && totalItems !== undefined && pageSize !== undefined
      ? Math.min(currentPage * pageSize, totalItems)
      : null;

  const btnBase =
    'inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed';

  const activePage = `${btnBase} bg-indigo-600 text-white`;
  const inactivePage = `${btnBase} text-slate-700 hover:bg-slate-100`;
  const ellipsis = `${btnBase} text-slate-400 cursor-default`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {showInfo && startItem !== null && endItem !== null && totalItems !== undefined ? (
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{startItem}</span>–
          <span className="font-medium text-slate-700">{endItem}</span> of{' '}
          <span className="font-medium text-slate-700">{totalItems}</span> results
        </p>
      ) : (
        <span />
      )}

      <nav
        className="flex items-center gap-1"
        aria-label="Pagination"
      >
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className={inactivePage}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {pages.map((page, idx) =>
          page === '…' ? (
            <span key={`ellipsis-${idx}`} className={ellipsis}>
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={page === currentPage ? activePage : inactivePage}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className={inactivePage}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
