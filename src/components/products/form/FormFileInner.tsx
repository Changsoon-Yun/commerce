import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';

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
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={'picture'} style={{ color: 'black' }}>
              <div
                className={
                  'border-zinc-500 border-2 rounded mt-3 p-3 flex justify-center items-center cursor-pointer'
                }>
                <MdOutlinePhotoCamera size={50} />
                <p className={'hidden'}>{label}</p>
              </div>
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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
