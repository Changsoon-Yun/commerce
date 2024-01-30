import { Link } from 'react-router-dom';

export default function SellerDashBoardPage() {
  return (
    <>
      <div>판매자 대시보드</div>
      <Link to={'/seller/product/add'}>판매자 상품 등록</Link>
    </>
  );
}
