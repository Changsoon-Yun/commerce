import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className?: string;
}

export default function CardDescription({ text, className, ...rest }: CardDescriptionProps) {
  return (
    <>
      <p {...rest} className={cn('text-sm font-semibold line-clamp-2', className)}>
        {text}
      </p>
    </>
  );
}
