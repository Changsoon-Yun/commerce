import { categories } from '@/constant/categories.ts';
import CardWithCategory from '@/components/products/home/CardWithCategory.tsx';

export default function HomePage() {
  return (
    <>
      {categories.map((category) => (
        <CardWithCategory category={category} />
      ))}
    </>
  );
}
