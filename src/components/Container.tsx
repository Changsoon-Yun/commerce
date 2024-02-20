import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <>
      <div className={cn('px-5 bg-white mb-2', className)} {...rest}>
        {children}
      </div>
    </>
  );
}
