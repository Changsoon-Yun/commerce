import { Input } from '@/components/ui/input.tsx';
import { FormItem, FormLabel } from '@/components/ui/form.tsx';
import { FormTextInputProps } from '@/types/submission.ts';

export default function FormNumberInput<TName extends string>({
  label,
  placeholder,
  field,
}: FormTextInputProps<TName>) {
  return (
    <>
      <FormItem className={'py-2'}>
        <FormLabel className={'font-black text-black'}>{label}</FormLabel>
        <div className={'relative'}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">&#8361;</span>
          </div>
          <Input
            {...field}
            data-testid={field.name}
            type={'number'}
            placeholder={placeholder}
            className={
              'pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            }
          />
        </div>
      </FormItem>
    </>
  );
}
