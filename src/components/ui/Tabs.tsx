'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TabsVariant = 'underline' | 'pills';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
  className?: string;
}

// ---------------------------------------------------------------------------
// Tabs Component
// ---------------------------------------------------------------------------

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}: TabsProps) {
  if (variant === 'pills') {
    return (
      <div
        className={['flex gap-1 p-1 bg-slate-100 rounded-lg w-fit', className]
          .filter(Boolean)
          .join(' ')}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={[
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                isActive
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {tab.icon && <span className="shrink-0 h-4 w-4">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }

  // underline variant (default)
  return (
    <div
      className={['flex border-b border-slate-200 gap-0', className].filter(Boolean).join(' ')}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={[
              'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset',
              isActive
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tab.icon && <span className="shrink-0 h-4 w-4">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
