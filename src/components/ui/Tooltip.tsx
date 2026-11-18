'use client';

import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
}

// ---------------------------------------------------------------------------
// Position classes
// ---------------------------------------------------------------------------

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent',
};

// ---------------------------------------------------------------------------
// Tooltip Component
// ---------------------------------------------------------------------------

export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={['relative inline-flex items-center', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          role="tooltip"
          className={[
            'absolute z-50 px-2.5 py-1.5 rounded-md bg-slate-800 text-white text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg',
            positionClasses[position],
          ].join(' ')}
        >
          {content}
          {/* Arrow */}
          <span
            aria-hidden="true"
            className={[
              'absolute border-4',
              arrowClasses[position],
            ].join(' ')}
          />
        </span>
      )}
    </span>
  );
}

export default Tooltip;
