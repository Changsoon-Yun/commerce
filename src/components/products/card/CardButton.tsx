import { Button, ButtonProps } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';

interface CardButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function CardButton({ children, ...rest }: CardButtonProps) {
  return (
    <>
      <Button className={'flex-1'} {...rest}>
        {children}
      </Button>
    </>
  );
}
