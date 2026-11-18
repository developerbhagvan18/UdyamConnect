import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Textarea Component
// ---------------------------------------------------------------------------

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-slate-700 select-none"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        className={[
          'w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
          'resize-y transition-colors duration-150',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-300'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {error && (
        <p className="text-xs text-rose-600 flex items-center gap-1" role="alert">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}

export default Textarea;
