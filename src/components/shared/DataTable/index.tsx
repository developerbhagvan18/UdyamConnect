'use client';

import { useState, ReactNode } from 'react';
import EmptyState from '@/src/components/shared/EmptyState';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  striped?: boolean;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

function getNestedValue<T>(obj: T, key: string): unknown {
  return key.split('.').reduce((acc: unknown, part: string) => {
    if (acc !== null && acc !== undefined && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available.',
  striped = false,
  className = '',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  function handleSort(key: string) {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') { setSortKey(null); setSortDir(null); }
      else setSortDir('asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = getNestedValue(a, sortKey);
    const bVal = getNestedValue(b, sortKey);
    if (aVal === bVal) return 0;
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    const cmp = String(aVal) < String(bVal) ? -1 : 1;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={col.width ? { width: col.width } : undefined}
                  className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap select-none ${
                    col.sortable ? 'cursor-pointer hover:text-slate-700' : ''
                  }`}
                  onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="inline-flex flex-col">
                        <svg
                          className={`w-2.5 h-2.5 ${sortKey === String(col.key) && sortDir === 'asc' ? 'text-indigo-600' : 'text-slate-300'}`}
                          viewBox="0 0 10 6"
                          fill="currentColor"
                        >
                          <path d="M0 6l5-6 5 6z" />
                        </svg>
                        <svg
                          className={`w-2.5 h-2.5 ${sortKey === String(col.key) && sortDir === 'desc' ? 'text-indigo-600' : 'text-slate-300'}`}
                          viewBox="0 0 10 6"
                          fill="currentColor"
                        >
                          <path d="M0 0l5 6 5-6z" />
                        </svg>
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={emptyMessage} />
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50 ${
                    striped && rowIndex % 2 === 1 ? 'bg-slate-50/50' : ''
                  }`}
                >
                  {columns.map((col) => {
                    const rawValue = getNestedValue(row, String(col.key)) as T[keyof T];
                    return (
                      <td key={String(col.key)} className="px-4 py-3 text-slate-700 whitespace-nowrap">
                        {col.render ? col.render(rawValue, row) : String(rawValue ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
