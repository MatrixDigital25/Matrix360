import React from 'react';
import { cn } from '@/src/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyan' | 'amber' | 'green' | 'red' | 'outline' | 'secondary';
  className?: string;
  children?: React.ReactNode;
  key?: React.Key;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-text-main',
    cyan: 'bg-interaction-primary/10 text-interaction-primary border border-interaction-primary/20',
    amber: 'bg-amber-100 text-amber-700 border border-amber-200',
    green: 'bg-alert-opportunity/10 text-alert-opportunity border border-alert-opportunity/20',
    red: 'bg-alert-risk/10 text-alert-risk border border-alert-risk/20',
    outline: 'text-text-muted border border-border-light',
    secondary: 'text-text-muted border border-border-light',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-interaction-primary focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
