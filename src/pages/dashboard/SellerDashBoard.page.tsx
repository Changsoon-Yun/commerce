import { Link } from 'react-router-dom';
import useGetSellerProducts from '@/apis/useGetSellerProducts.ts';
import { Button } from '@/components/ui/button.tsx';
import useProductActions from '@/apis/useProductActions.ts';
import { categories } from '@/constant/categories.ts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { conditions } from '@/constant/conditions';

export default function SellerDashBoardPage() {
  const { products, inViewRef, isFetchingNextPage } = useGetSellerProducts();
  const { deleteHandler } = useProductActions();

  const getCategoryLabelByValue = (value: string): string | undefined => {
    const category = categories.find((category) => category.value === value);
    return category ? category.label : undefined;
  };

  const getConditionLabelByValue = (value: string): string | undefined => {
    const condition = conditions.find((condition) => condition.value === value);
    return condition ? condition.label : undefined;
  };
  return (
    <>
      <div className={'flex justify-center py-16'}>
        <Button>
          <Link to={'/seller/product/add'}>판매자 상품 등록</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableCaption>마지막 제품 입니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[130px]">대표이미지</TableHead>
              <TableHead className="w-[130px]">제목</TableHead>
              <TableHead>설명</TableHead>
              <TableHead className="w-[130px]">카테고리</TableHead>
              <TableHead className="w-[130px]">상태</TableHead>
              <TableHead className="w-[130px]">비고</TableHead>
              <TableHead className="text-right w-[130px]">price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.pages.map((items) =>
              items.products.map(
                ({ title, desc, imageList, createdAt, id, price, category, condition }) => (
                  <TableRow key={createdAt.seconds}>
                    <TableCell>
                      <div className={'w-24 h-24 rounded-2xl border overflow-hidden'}>
                        <img
                          src={imageList[0]}
                          className={'w-full h-full object-cover'}
                          alt="상품이미지"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{desc}</TableCell>
                    <TableCell>{getCategoryLabelByValue(category)}</TableCell>
                    <TableCell>{getConditionLabelByValue(condition)}</TableCell>
                    <TableCell>
                      <div className={'flex flex-col flex-wrap gap-3 max-w-sm'}>
                        <Button>
                          <Link to={`/seller/product/edit/${id}`}>수정하기</Link>
                        </Button>
                        <Button
                          variant={'destructive'}
                          onClick={() => {
                            deleteHandler(id);
                          }}>
                          삭제하기
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{price}원</TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
