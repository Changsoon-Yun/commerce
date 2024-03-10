import { Input } from '@/components/ui/input.tsx';
import { SubmissionInputProps } from '@/types/submission.ts';
import { FormControl, FormMessage } from '@/components/ui/form.tsx';

export default function SubmissionInput<TName extends string>({
  field,
  type = 'text',
  hasPadding = false,
  placeholder,
}: SubmissionInputProps<TName>) {
  return (
    <>
      <FormControl>
        <Input
          {...field}
          data-testid={field.name}
          type={type}
          placeholder={placeholder}
          className={`${hasPadding && 'pl-7'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </FormControl>
      <FormMessage className={'pt-2'} data-testid={`${field.name}-error-msg`} />
    </>
  );
}
