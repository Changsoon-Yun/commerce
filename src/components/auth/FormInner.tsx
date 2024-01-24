import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input.tsx';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  isRegister?: boolean;
}

export default function FormInner<T extends FieldValues>({
  form,
  name,
  label,
  isRegister,
}: FormInnerProps<T>) {
  return (
    <>
      <div className={'pb-4'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: 'black' }}>{label}</FormLabel>
              <FormControl>
                <Input
                  type={name === 'password' ? 'password' : ''}
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              {name === 'password' && isRegister && (
                <FormDescription>
                  최소 8자리 이상 : 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
