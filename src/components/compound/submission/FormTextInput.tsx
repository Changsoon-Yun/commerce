import { Input } from '@/components/ui/input.tsx';
import { FormItem, FormLabel } from '@/components/ui/form.tsx';
import { FormTextInputProps } from '@/types/submission.ts';
import { Textarea } from '@/components/ui/textarea.tsx';

export default function FormTextInput<TName extends string>({
  label,
  placeholder,
  field,
  type = 'text',
}: FormTextInputProps<TName>) {
  return (
    <>
      <FormItem className={'py-2'}>
        <FormLabel className={'font-black text-black'}>{label}</FormLabel>
        <div className={'relative'}>
          {type === 'number' && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">&#8361;</span>
            </div>
          )}
          {type === 'textArea' ? (
            <Textarea {...field} placeholder={placeholder} className="resize-none" />
          ) : (
            <Input
              {...field}
              data-testid={field.name}
              type={type}
              placeholder={placeholder}
              className={`${type === 'number' && 'pl-7'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            />
          )}
        </div>
      </FormItem>
    </>
  );
}
