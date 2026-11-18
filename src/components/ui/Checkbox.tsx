'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

// ---------------------------------------------------------------------------
// Checkbox Component
// ---------------------------------------------------------------------------

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
}: CheckboxProps) {
  const checkboxId =
    id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label
      htmlFor={checkboxId}
      className={[
        'inline-flex items-center gap-2.5 select-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={[
            'h-4 w-4 rounded border-2 flex items-center justify-center transition-colors duration-150',
            checked
              ? 'bg-indigo-600 border-indigo-600'
              : 'bg-white border-slate-300',
            !disabled && !checked ? 'hover:border-indigo-400' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {checked && (
            <svg
              className="h-2.5 w-2.5 text-white"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <span className="text-sm text-slate-700">{label}</span>
      )}
    </label>
  );
}

export default Checkbox;
