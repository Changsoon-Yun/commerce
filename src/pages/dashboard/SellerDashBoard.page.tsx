import { Link } from 'react-router-dom';
import useGetSellerProducts from '@/apis/useGetSellerProducts.ts';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator';

export default function SellerDashBoardPage() {
  const { products } = useGetSellerProducts();
  useEffect(() => {
    if (products) {
      console.log(products[0].id);
    }
  }, [products]);
  return (
    <>
      <div>판매자 대시보드</div>
      <Link to={'/seller/product/add'}>판매자 상품 등록</Link>
      <div>
        {products?.map(({ title, desc, imageList, createdAt }) => (
          <div key={title}>
            <div className={'flex justify-between items-center p-2'}>
              <div className={'flex items-center'}>
                <div className={'w-24 h-24 rounded-2xl border overflow-hidden mr-4'}>
                  <img
                    src={imageList[0]}
                    className={'w-full h-full object-cover'}
                    alt="상품이미지"
                  />
                </div>
                <div>
                  <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">{title}</h4>
                  <p className="leading-7">{desc}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{createdAt.seconds}</p>
                </div>
              </div>
              <div>
                <Button>수정하기</Button>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </>
  );
}
