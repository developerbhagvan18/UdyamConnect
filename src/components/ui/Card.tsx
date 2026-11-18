import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardVariant = 'default' | 'elevated' | 'bordered';

interface CardProps {
  variant?: CardVariant;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-100 shadow-sm',
  elevated: 'bg-white border border-slate-100 shadow-md',
  bordered: 'bg-white border-2 border-slate-200 shadow-none',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={['px-6 py-4 border-b border-slate-100', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={['px-6 py-4', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      className={[
        'px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card Component
// ---------------------------------------------------------------------------

export function Card({
  variant = 'default',
  title,
  description,
  footer,
  children,
  className = '',
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(title || description) && (
        <CardHeader>
          {title && (
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          )}
          {description && (
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          )}
        </CardHeader>
      )}

      {children && <CardBody>{children}</CardBody>}

      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}

export default Card;
