import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input.tsx';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { loginFormSchema, registerFormSchema } from '@/lib/zod/schemas.ts';

/** todo: 유니온 타입으로 잘 설정 했는데 email,password만 받을수있다고 에러가 남 왜지 ??
 *
 */
type schemas = z.TypeOf<typeof loginFormSchema> | z.TypeOf<typeof registerFormSchema> | any;

interface FormInnerProps {
  form: UseFormReturn<schemas>;
  name: 'email' | 'password' | 'userName';
  label: string;
  isRegister?: boolean;
}

export default function FormInner({ form, name, label, isRegister }: FormInnerProps) {
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
