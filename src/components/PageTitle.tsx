import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  children?: ReactNode;
}
export default function PageTitle({ title, children }: PageTitleProps) {
  return (
    <>
      <div className={'relative flex items-center justify-center pb-16'} data-cy={'seller-title'}>
        <h2 className="flex-1 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
}
