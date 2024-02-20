import { categories } from '@/constant/categories.ts';
import { conditions } from '@/constant/conditions.ts';
import { TimeStamp } from '@/types/product';

export const convertLabelByValue = (
  value: string,
  arr: typeof categories | typeof conditions
): string | undefined => {
  const item = arr.find((item) => item.value === value);
  return item ? item.label : undefined;
};

export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getDateFromProduct = (time: TimeStamp) => {
  if (time) {
    return ((time.seconds + time.nanoseconds / 1000000000) * 1000).toString();
  } else {
    return '';
  }
};
