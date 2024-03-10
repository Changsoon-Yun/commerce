import { FormItem } from '../../ui/form.tsx';
import { ReactNode } from 'react';

interface FormRootProps {
  children: ReactNode;
}

function SubmissionRoot({ children }: FormRootProps) {
  return (
    <>
      <FormItem className={'py-2'}>{children}</FormItem>
    </>
  );
}

export default SubmissionRoot;
