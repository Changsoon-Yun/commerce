import { Product } from '@/types/product.ts';
import { ReactNode } from 'react';

interface NoProductProps {
  products: Product[] | undefined;
  title: string;
  desc: string;
  children?: ReactNode;
}

export default function NoProduct({ products, title, desc, children }: NoProductProps) {
  return (
    <>
      {products?.length === 0 && (
        <div className={'flex-1 flex flex-col justify-center items-center gap-1'}>
          <h2>{title}</h2>
          <p>{desc}</p>
          {children}
        </div>
      )}
    </>
  );
}
