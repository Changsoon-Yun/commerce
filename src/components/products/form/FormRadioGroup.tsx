'use client';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { conditions } from '@/constant/conditions.ts';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}
export default function FormRadioGroup<T extends FieldValues>({
  form,
  name,
  label,
}: FormInnerProps<T>) {
  return (
    <>
      <div className="pb-4">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className={'font-black text-black'}>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap gap-4">
                  {conditions.map((condition) => (
                    <FormItem
                      key={condition.value}
                      className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={condition.value} />
                      </FormControl>
                      <FormLabel className="font-normal text-black">{condition.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
