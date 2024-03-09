import { Button, ButtonProps } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

interface CardButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function CardButton({ children, className, ...rest }: CardButtonProps) {
  return (
    <>
      <Button
        className={cn(
          'flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2',
          className
        )}
        {...rest}>
        {children}
      </Button>
    </>
  );
}
