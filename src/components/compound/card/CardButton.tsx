import { Button, ButtonProps } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';
import { useCardContext } from '@/hooks/useCardContext';

interface CardButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function CardButton({ children, className, ...rest }: CardButtonProps) {
  const { variant } = useCardContext();
  return (
    <>
      <Button className={cn('flex-1 h-9 px-4 py-2', className)} variant={variant} {...rest}>
        {children}
      </Button>
    </>
  );
}
