import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command.tsx';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { categories } from '@/constant/categories.ts';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';

interface FormInnerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export default function FormComboxInner<T extends FieldValues>({
  form,
  name,
  label,
}: FormInnerProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={'pb-4'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className={'font-black text-black'}>{label}</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value
                        ? categories.find((category) => category.value === field.value)?.label
                        : '카테고리 선택'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="카테고리 검색" />
                    <CommandEmpty>검색된 카테고리가 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.label}
                          key={category.value}
                          onSelect={() => {
                            // @ts-ignore
                            form.setValue(name, category.value);
                          }}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              category.value === field.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
