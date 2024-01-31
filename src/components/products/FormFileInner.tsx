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
import { ChangeEvent } from 'react';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  addImgHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFileInner<T extends FieldValues>({
  form,
  name,
  label,
  addImgHandler,
}: FormInnerProps<T>) {
  return (
    <>
      <div className={'pb-4'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={'picture'} style={{ color: 'black' }}>
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={'hidden'}
                  onChange={addImgHandler}
                  id="picture"
                  type="file"
                  multiple={true}
                />
              </FormControl>
              <FormDescription>이미지는 최소 한장필요합니다</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
