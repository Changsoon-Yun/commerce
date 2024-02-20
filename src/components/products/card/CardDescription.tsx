import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string | ReactNode;
  className?: string;
}

export default function CardDescription({ text, className, ...rest }: CardDescriptionProps) {
  return (
    <>
      <div {...rest} className={cn('text-sm font-semibold line-clamp-2', className)}>
        {text}
      </div>
    </>
  );
}
