import React from 'react';
import { getInitials, getAvatarColor } from '@/src/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

// ---------------------------------------------------------------------------
// Avatar Component
// ---------------------------------------------------------------------------

export function Avatar({ src, name = '', size = 'md', className = '' }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);

  const base = [
    'inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 font-semibold select-none',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name ? `${name}'s avatar` : 'Avatar'}
        className={[base, 'object-cover'].join(' ')}
      />
    );
  }

  return (
    <span className={[base, colorClass, 'text-white'].join(' ')} aria-label={name || 'Avatar'}>
      {initials}
    </span>
  );
}

export default Avatar;
