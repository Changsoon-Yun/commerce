import { useParams } from 'react-router-dom';
import { convertLabelByValue } from '@/utils/converter.ts';
import { categories } from '@/constant/categories.ts';

export default function CategoryProductsPage() {
  const { category } = useParams();
  if (!category) {
    return;
  }
  return <>{convertLabelByValue(category, categories)}카테고리 상품 입니다.</>;
}
