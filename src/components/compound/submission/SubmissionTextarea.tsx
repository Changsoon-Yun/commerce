import { Textarea } from '@/components/ui/textarea.tsx';
import { SubmissionTextareaProps } from '@/types/submission.ts';

export default function SubmissionTextarea<TName extends string>({
  placeholder,
  field,
}: SubmissionTextareaProps<TName>) {
  return (
    <>
      <Textarea {...field} placeholder={placeholder} className="resize-none" />
    </>
  );
}
