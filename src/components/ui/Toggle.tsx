'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToggleSize = 'sm' | 'md';

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
}

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const trackSize: Record<ToggleSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
};

const thumbSize: Record<ToggleSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
};

const thumbTranslate: Record<ToggleSize, { off: string; on: string }> = {
  sm: { off: 'translate-x-0.5', on: 'translate-x-[18px]' },
  md: { off: 'translate-x-1', on: 'translate-x-6' },
};

// ---------------------------------------------------------------------------
// Toggle Component
// ---------------------------------------------------------------------------

export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleProps) {
  return (
    <label
      className={[
        'inline-flex items-center gap-3 select-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          trackSize[size],
          checked ? 'bg-indigo-600' : 'bg-slate-200',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0',
            'transition-transform duration-200 ease-in-out',
            thumbSize[size],
            checked ? thumbTranslate[size].on : thumbTranslate[size].off,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </button>

      {label && (
        <span className="text-sm text-slate-700 font-medium">{label}</span>
      )}
    </label>
  );
}

export default Toggle;
