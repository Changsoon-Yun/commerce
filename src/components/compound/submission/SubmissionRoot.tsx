import { FormItem } from '../../ui/form.tsx';
import { ReactNode } from 'react';

interface FormRootProps {
  children: ReactNode;
}

// TODO: Submission컴포넌트 완성해야함

function SubmissionRoot({ children }: FormRootProps) {
  return (
    <>
      <FormItem className={'py-2'}>{children}</FormItem>
    </>
  );
}

export default SubmissionRoot;
