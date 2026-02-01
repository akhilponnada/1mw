import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  className = '',
}) => {
  const { ref, displayValue } = useCountUp({
    end,
    duration,
    decimals,
    prefix,
    suffix,
  });

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="stat-number">{displayValue}</div>
      <p className="text-muted-foreground mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
