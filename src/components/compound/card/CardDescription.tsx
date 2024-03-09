import { cn } from '@/lib/utils.ts';
import { HTMLAttributes, ReactNode } from 'react';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string | ReactNode;
  className?: string;
}

export default function CardDescription({ text, className, ...rest }: CardDescriptionProps) {
  return (
    <>
      <div className={cn('text-sm line-clamp-2', className)} {...rest}>
        {text}
      </div>
    </>
  );
}
