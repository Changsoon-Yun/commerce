import { ReactNode } from 'react';

interface PageTitleProps {
  title: string | ReactNode;
  children?: ReactNode;
}
export default function PageTitle({ title, children }: PageTitleProps) {
  return (
    <>
      <div
        className={'relative flex flex-col gap-4 items-center justify-center bg-white mb-2 py-8'}
        data-cy={'seller-title'}>
        <h2 className="flex-1 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
}
