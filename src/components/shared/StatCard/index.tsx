import { ReactNode } from 'react';

type Color = 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'cyan';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  color: Color;
  className?: string;
}

const colorMap: Record<Color, { bg: string; iconBg: string; iconText: string }> = {
  indigo: { bg: 'bg-indigo-50',  iconBg: 'bg-indigo-100',  iconText: 'text-indigo-600'  },
  emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
  amber:  { bg: 'bg-amber-50',   iconBg: 'bg-amber-100',   iconText: 'text-amber-600'   },
  rose:   { bg: 'bg-rose-50',    iconBg: 'bg-rose-100',    iconText: 'text-rose-600'    },
  violet: { bg: 'bg-violet-50',  iconBg: 'bg-violet-100',  iconText: 'text-violet-600'  },
  cyan:   { bg: 'bg-cyan-50',    iconBg: 'bg-cyan-100',    iconText: 'text-cyan-600'    },
};

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  color,
  className = '',
}: StatCardProps) {
  const colors = colorMap[color];
  const isPositive = change !== undefined && change >= 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-start gap-4 ${className}`}
    >
      <div className={`${colors.iconBg} ${colors.iconText} rounded-xl p-3 shrink-0`}>
        <span className="block w-6 h-6 flex items-center justify-center text-xl leading-none">
          {icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-none">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {isPositive && (
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {isNegative && (
              <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span
              className={`text-xs font-semibold ${
                isPositive ? 'text-emerald-600' : isNegative ? 'text-rose-600' : 'text-slate-500'
              }`}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-slate-400">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
