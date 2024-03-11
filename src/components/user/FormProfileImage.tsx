import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { MdEdit } from '@react-icons/all-files/md/MdEdit';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  addImgHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  profileImage: string;
  isEdit: boolean;
}

export default function FormProfileImage<T extends FieldValues>({
  form,
  name,
  addImgHandler,
  profileImage,
  isEdit,
}: FormInnerProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={'relative w-32 h-32 m-auto'}>
            <img
              data-testid={'profile-img'}
              src={profileImage || '/img/defaultProfileImage.png'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            {isEdit && (
              <>
                <FormLabel
                  htmlFor={'picture'}
                  className={
                    'absolute bottom-1 right-1 rounded-full overflow-hidden border border-zinc-500 p-0.5 flex justify-center items-center bg-white cursor-pointer'
                  }>
                  <MdEdit />
                  <p className={'hidden'}>{name}</p>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testid={name + '-input'}
                    className={'hidden'}
                    // onChange={addImgHandler}
                    onChange={(e) => {
                      addImgHandler(e);
                    }}
                    id="picture"
                    type="file"
                    multiple={false}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
