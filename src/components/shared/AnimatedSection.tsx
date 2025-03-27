
import React, { useEffect, useState } from 'react';
import { useInView } from '@/utils/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const getAnimationClass = () => {
    if (!hasAnimated) return 'opacity-0';
    
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        opacity: hasAnimated ? 1 : 0
      }}
      data-animated={hasAnimated}
    >
      <div className={cn(getAnimationClass(), 'will-change-transform')}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedSection;
