import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu.tsx';
import { Link } from 'react-router-dom';

interface SellerHeaderProps {
  isSeller: boolean;
}
export default function SellerHeader({ isSeller }: SellerHeaderProps) {
  return (
    <>
      {isSeller && (
        <>
          <DropdownMenuLabel>판매자 메뉴</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link className={'w-full'} to={'/seller/dashboard'}>
              판매 목록
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={'/seller/product/add'}>상품 등록</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}
    </>
  );
}
