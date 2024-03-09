import { ReactNode } from 'react';

interface SubmissionContentProps {
  children: ReactNode;
}

export default function SubmissionContent({ children }: SubmissionContentProps) {
  return (
    <>
      <div className={'relative'}>{children}</div>
    </>
  );
}
