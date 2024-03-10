import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import { Link } from 'react-router-dom';
import { formatNumberWithCommas, getDateFromProduct } from '@/utils/converter';
import { Product } from '@/types/product.ts';
import { Card } from '../compound/card';
import { Button } from '@/components/ui/button.tsx';

export default function CartList({ product }: { product: Product }) {
  const { removeCart, toggleHandler } = useContext(CartContext);

  if (!product) {
    return;
  }
  const { id, imageList, title, price, updatedAt } = product;
  return (
    <>
      <Card.Root key={id} to={`/product/${id}`} data-testid={'cart-item'}>
        <Card.Img imageList={imageList} />
        <Card.Title title={title} />
        <Card.Description
          data-testid={'product-price'}
          text={formatNumberWithCommas(price) + '원'}
        />
        <Card.Description
          data-testid={'product-date'}
          text={getDateFromProduct(updatedAt)}
          className={'hidden'}
        />
        <Card.Buttons>
          <Card.Button
            variant={'outline'}
            asChild
            onClick={() => {
              toggleHandler();
            }}>
            <Link to={`/product/${id}`}>상세보기</Link>
          </Card.Button>
          <Button
            variant={'outline'}
            asChild
            data-testid={'delete-button'}
            onClick={() => {
              removeCart(id);
            }}>
            <Link to={`/product/${id}`}>삭제하기</Link>
          </Button>
        </Card.Buttons>
      </Card.Root>
    </>
  );
}
