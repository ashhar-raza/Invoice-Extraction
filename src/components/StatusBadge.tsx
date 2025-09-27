import React from 'react';
import { Badge } from './ui/badge';
import { Invoice } from '../types/invoice';
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: Invoice['status'];
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className = '', showIcon = true }: StatusBadgeProps) {
  const getStatusConfig = (status: Invoice['status']) => {
    switch (status) {
      case 'processed':
        return {
          variant: 'default' as const,
          text: 'Valid',
          className: 'status-valid',
          icon: CheckCircle
        };
      case 'needs_review':
        return {
          variant: 'secondary' as const,
          text: 'Pending',
          className: 'status-pending',
          icon: Clock
        };
      case 'failed':
        return {
          variant: 'destructive' as const,
          text: 'Invalid',
          className: 'status-invalid',
          icon: XCircle
        };
      case 'processing':
        return {
          variant: 'outline' as const,
          text: 'Validating',
          className: 'status-validating processing-indicator',
          icon: Loader2
        };
      default:
        return {
          variant: 'outline' as const,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-600 font-medium',
          icon: null
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={`flex items-center gap-1.5 ${config.className} ${className}`}
    >
      {showIcon && IconComponent && (
        <IconComponent className={`h-3 w-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
      )}
      {config.text}
    </Badge>
  );
}