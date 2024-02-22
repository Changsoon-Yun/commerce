import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input.tsx';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  isRegister?: boolean;
  isTextArea?: boolean;
  type?: string;
}

export default function FormInner<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type,
  isTextArea,
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
                {isTextArea ? (
                  <Textarea placeholder={placeholder} className="resize-none" {...field} />
                ) : type === 'number' ? (
                  <>
                    <div className={'relative'}>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">&#8361;</span>
                      </div>
                      <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        data-testid={name}
                        className={
                          'pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        }
                      />
                    </div>
                  </>
                ) : (
                  <Input
                    type={type}
                    placeholder={placeholder}
                    autoComplete={'on'}
                    className={
                      '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    }
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage data-testid={`${name}-error-msg`} />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
