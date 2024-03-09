import { Input } from '@/components/ui/input.tsx';
import { SubmissionInputProps } from '@/types/submission.ts';

export default function SubmissionInput<TName extends string>({
  field,
  type = 'text',
  hasPadding = false,
  placeholder,
}: SubmissionInputProps<TName>) {
  return (
    <>
      <Input
        {...field}
        data-testid={field.name}
        type={type}
        placeholder={placeholder}
        className={`${hasPadding && 'pl-7'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
    </>
  );
}
