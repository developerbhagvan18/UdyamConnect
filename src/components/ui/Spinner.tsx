import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  label?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

// ---------------------------------------------------------------------------
// Spinner Component
// ---------------------------------------------------------------------------

export function Spinner({
  size = 'md',
  color = 'text-indigo-600',
  className = '',
  label = 'Loading…',
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
    >
      <svg
        className={['animate-spin', sizeClasses[size], color].filter(Boolean).join(' ')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default Spinner;
