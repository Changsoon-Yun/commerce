import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';
import { filterArr } from '@/pages/products/CategoryProducts.page.tsx';

interface FilterListProps {
  onChangeFilterHandler: (item: string) => void;
  selectedFilter: string;
}
export default function FilterList({ onChangeFilterHandler, selectedFilter }: FilterListProps) {
  return (
    <>
      <div className={'flex justify-end pb-8'}>
        <RadioGroup
          defaultValue={filterArr[0]}
          className={'flex gap-4'}
          onValueChange={onChangeFilterHandler}>
          {filterArr.map((item) => (
            <div className="flex items-center space-x-2" key={item}>
              <RadioGroupItem value={item} id={item} className={'hidden'} />
              <Label
                htmlFor={item}
                className={`cursor-pointer pb-1 ${selectedFilter === item ? 'font-bold border-b border-gray-600' : 'font-medium'}`}>
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}
