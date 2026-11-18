'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

// ---------------------------------------------------------------------------
// Dropdown Component
// ---------------------------------------------------------------------------

export function Dropdown({
  trigger,
  items,
  align = 'left',
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      className={['relative inline-block', className].filter(Boolean).join(' ')}
    >
      {/* Trigger */}
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          className={[
            'absolute z-50 mt-1 min-w-[160px] rounded-lg border border-slate-200 bg-white shadow-lg py-1',
            align === 'right' ? 'right-0' : 'left-0',
          ]
            .filter(Boolean)
            .join(' ')}
          role="menu"
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              role="menuitem"
              onClick={() => {
                item.onClick();
                close();
              }}
              className={[
                'flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left',
                'transition-colors duration-100',
                'focus:outline-none focus-visible:bg-slate-50',
                item.danger
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-slate-700 hover:bg-slate-50',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.icon && (
                <span className="shrink-0 h-4 w-4 text-current opacity-70" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
