import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input.tsx';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  isEdit: boolean;
}

export default function FormUserName<T extends FieldValues>({
  form,
  name,
  label,
  isEdit,
}: FormInnerProps<T>) {
  return (
    <>
      <div className={'pb-4'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'font-black text-black'}>{label}</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEdit}
                  type={'text'}
                  autoComplete={'on'}
                  className={'text-black'}
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid={`${name}-error-msg`} />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
