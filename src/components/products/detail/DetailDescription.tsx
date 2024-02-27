import { HTMLAttributes } from 'react';

interface DescriptionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

export default function DetailDescription({ title, content, ...rest }: DescriptionProps) {
  return (
    <div className="flex gap-2 text-sm">
      <span className={'text-zinc-400 min-w-[70px]'}>{title}</span>
      <span>:</span>
      <span {...rest} className={'text-zinc-600 font-semibold'}>
        {content}
      </span>
    </div>
  );
}
