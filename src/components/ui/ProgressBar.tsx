import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  size?: ProgressSize;
  className?: string;
  label?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

// ---------------------------------------------------------------------------
// ProgressBar Component
// ---------------------------------------------------------------------------

export function ProgressBar({
  value,
  color = 'bg-indigo-600',
  showLabel = false,
  size = 'md',
  className = '',
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-slate-600">{label}</span>
          )}
          {showLabel && (
            <span className="text-xs font-semibold text-slate-700 ml-auto">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div
        className={[
          'w-full overflow-hidden rounded-full bg-slate-100',
          sizeClasses[size],
        ].join(' ')}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Progress: ${clamped}%`}
      >
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-out',
            color,
          ].join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
