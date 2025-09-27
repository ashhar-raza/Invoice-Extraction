import React from 'react';
import { Badge } from './ui/badge';

interface ConfidenceBadgeProps {
  confidence: number;
  className?: string;
}

export function ConfidenceBadge({ confidence, className = '' }: ConfidenceBadgeProps) {
  const getConfidenceConfig = (confidence: number) => {
    if (confidence >= 90) {
      return {
        variant: 'default' as const,
        className: 'confidence-high',
        label: 'High'
      };
    } else if (confidence >= 70) {
      return {
        variant: 'secondary' as const,
        className: 'confidence-medium',
        label: 'Medium'
      };
    } else {
      return {
        variant: 'destructive' as const,
        className: 'confidence-low',
        label: 'Low'
      };
    }
  };

  const config = getConfidenceConfig(confidence);

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${className}`}
    >
      {config.label} ({confidence}%)
    </Badge>
  );
}