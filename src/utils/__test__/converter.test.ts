import { categories } from '@/constant/categories.ts';
import { conditions } from '@/constant/conditions.ts';
import { convertLabelByValue, formatNumberWithCommas, getDateFromProduct } from '../converter.ts';
import { TimeStamp } from '@/types/product';
import { describe, expect, it } from 'vitest';

describe('convertLabelByValue', () => {
  it('카테고리 배열에서 주어진 값에 대한 올바른 라벨을 반환합니다', () => {
    expect(convertLabelByValue(categories[0].value, categories)).toBe(categories[0].label);
  });

  it('컨디션 배열에서 주어진 값에 대한 올바른 라벨을 반환합니다', () => {
    expect(convertLabelByValue(conditions[0].value, conditions)).toBe(conditions[0].label);
  });

  it('배열에서 값이 발견되지 않으면 undefined를 반환합니다', () => {
    expect(convertLabelByValue('nonexistent_value', categories)).toBeUndefined();
  });
});

describe('formatNumberWithCommas', () => {
  it('숫자를 쉼표로 올바르게 포맷합니다.', () => {
    expect(formatNumberWithCommas(1000000)).toBe('1,000,000');
  });

  it('이미 올바르게 포맷된 경우에도 동일한 숫자를 반환합니다.', () => {
    expect(formatNumberWithCommas(1)).toBe('1');
    expect(formatNumberWithCommas(1000)).toBe('1,000');
    expect(formatNumberWithCommas(1000000)).toBe('1,000,000');
  });
});

describe('getDateFromProduct', () => {
  it('TimeStamp 객체에서 올바른 날짜를 반환합니다', () => {
    const time: TimeStamp = { seconds: 1645239200, nanoseconds: 0 };
    expect(getDateFromProduct(time)).toBe(1645239200000);
  });

  it('TimeStamp 객체가 거짓 값이면 빈 문자열을 반환합니다.', () => {
    expect(getDateFromProduct(null as unknown as TimeStamp)).toBe('');
    expect(getDateFromProduct(undefined as unknown as TimeStamp)).toBe('');
    expect(getDateFromProduct('' as unknown as TimeStamp)).toBe('');
  });
});
