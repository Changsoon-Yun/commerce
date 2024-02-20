import { Link } from 'react-router-dom';
import { MenuContext } from '@/context/MenuContext.tsx';
import { useContext } from 'react';
import { Menu } from './menu';
import CategoryNav from '@/components/products/home/CategoryNav.tsx';

export default function Header() {
  const { closeMenuHandler } = useContext(MenuContext);

  return (
    <>
      <div className={'flex justify-between px-5 min-h-[60px] bg-white items-center'}>
        <div onClick={closeMenuHandler}>
          <Link to={'/'}>
            <img className={'w-10 h-10'} src="/img/logo-icon.png" alt="icon" />
          </Link>
        </div>
        <Menu.Root>
          <Menu.Trigger />
          <Menu.Content>
            <Menu.Header text={'카테고리'} />
            <CategoryNav />
            <Menu.Seperator />
            <Menu.Header text={'소비자 메뉴'} />
            <Menu.Link text={'내 프로필 보기'} to={'/user/dashboard'} />
            <Menu.Link text={'주문 내역 보기'} to={'/ordered-products'} />
            <Menu.Seperator />
            <Menu.Header text={'판매자 메뉴'} />
            <Menu.Link text={'판매 목록'} to={'/seller/dashboard'} />
            <Menu.Link text={'상품 등록'} to={'/seller/product/add'} />
            <Menu.Seperator />
            <Menu.Actions />
            <Menu.Seperator />
          </Menu.Content>
        </Menu.Root>
      </div>
    </>
  );
}
