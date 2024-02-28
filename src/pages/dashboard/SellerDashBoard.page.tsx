import { Link } from 'react-router-dom';
import useGetSellerProducts from '@/apis/useGetSellerProducts.ts';
import { Button } from '@/components/ui/button.tsx';
import { convertLabelByValue, formatNumberWithCommas, getDateFromProduct } from '@/utils/converter';
import useProductHandler from '@/hooks/useProductHandler.ts';
import { conditions } from '@/constant/conditions';
import dayjs from 'dayjs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderStatus } from '@/types/product.ts';
import { useAuth } from '@/apis/useAuth.ts';
import PageTitle from '@/components/PageTitle.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import { Card } from '@/components/products/card';
import DetailDescription from '@/components/products/detail/DetailDescription.tsx';

export default function SellerDashBoardPage() {
  const { products, inViewRef, isFetchingNextPage } = useGetSellerProducts();
  const { storedUserData } = useAuth();
  const { deleteHandler, updateOrderStatusHandler } = useProductHandler();

  return (
    <>
      <Metatags
        title={`Seconds: 중고거래 - 판매자 대시보드`}
        desc={'판매자 대시보드 페이지 입니다.'}
      />
      <Container>
        <PageTitle
          title={`${storedUserData?.userName}님의 판매 상품 목록`}
          children={
            <Button data-testid={'add-button'} asChild>
              <Link to={'/seller/product/add'}>상품 등록</Link>
            </Button>
          }
        />
      </Container>
      <Container className={'py-10'}>
        <div className={'grid grid-cols-2 gap-2'}>
          {products?.pages.map((items) =>
            items.products.map(
              ({ title, imageList, createdAt, orderedDate, id, price, condition, orderStatus }) => (
                <Card.Root key={createdAt.seconds} data-testid={'seller-product'}>
                  <Card.Img imageList={imageList} />
                  <Card.Title title={title} />
                  <Card.Description
                    text={
                      <DetailDescription
                        title={'등록일'}
                        data-testid={'product-date'}
                        content={dayjs(getDateFromProduct(createdAt)).format('YYYY년 MM월 DD일')}
                      />
                    }
                  />
                  <Card.Description
                    text={
                      <DetailDescription
                        data-testid={'product-condition'}
                        title={'상품 상태'}
                        content={convertLabelByValue(condition, conditions) as string}
                      />
                    }
                  />
                  {dayjs(getDateFromProduct(orderedDate)).format('YYYY년 MM월 DD일') ===
                  'Invalid Date' ? null : (
                    <Card.Description
                      text={
                        <DetailDescription
                          title={'주문일'}
                          data-testid={'product-ordered-date'}
                          content={dayjs(getDateFromProduct(orderedDate)).format(
                            'YYYY년 MM월 DD일'
                          )}
                        />
                      }
                    />
                  )}
                  <Card.Description
                    text={
                      orderStatus && (
                        <Select
                          onValueChange={(value) => {
                            updateOrderStatusHandler(value, id);
                          }}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder={orderStatus} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>주문 상태</SelectLabel>
                              {Object.values(OrderStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )
                    }
                  />
                  <Card.Description text={formatNumberWithCommas(price) + '원'} />
                  <Card.Buttons>
                    <Card.Button data-testid={'edit-button'} asChild>
                      <Link to={`/seller/product/edit/${id}`}>수정하기</Link>
                    </Card.Button>
                    <Card.Button
                      data-testid={'delete-button'}
                      variant={'destructive'}
                      onClick={() => {
                        deleteHandler(id);
                      }}>
                      삭제하기
                    </Card.Button>
                  </Card.Buttons>
                </Card.Root>
              )
            )
          )}
        </div>
      </Container>
      <div ref={inViewRef} className="">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
