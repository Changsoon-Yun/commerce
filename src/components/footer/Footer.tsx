import { useAuth } from '@/apis/auth/useAuth.ts';
import FooterIconWithCart from '@/components/footer/FooterIconWithCart.tsx';
import FooterIconWithLabel from '@/components/footer/FooterIconWithLabel.tsx';
import { IoHeartOutline } from '@react-icons/all-files/io5/IoHeartOutline';
import { IoHeart } from '@react-icons/all-files/io5/IoHeart';
import { FaList } from '@react-icons/all-files/fa/FaList';
import { IoLogInOutline } from '@react-icons/all-files/io5/IoLogInOutline';
import { RiHome5Fill } from '@react-icons/all-files/ri/RiHome5Fill';
import { RiHome5Line } from '@react-icons/all-files/ri/RiHome5Line';

export default function Footer() {
  const { storedUserData } = useAuth();

  return (
    <>
      <div className={''}>
        <nav className={'flex justify-around'}>
          <FooterIconWithLabel to={'/'} icon={RiHome5Line} exactIcon={RiHome5Fill} text={'홈'} />
          {storedUserData ? (
            <>
              <FooterIconWithCart icon={IoHeartOutline} exactIcon={IoHeart} text={'장바구니'} />
              <FooterIconWithLabel
                to={'/ordered-products'}
                icon={FaList}
                exactIcon={FaList}
                text={'주문내역'}
              />
            </>
          ) : (
            <FooterIconWithLabel
              icon={IoLogInOutline}
              to={'/login'}
              exactIcon={IoLogInOutline}
              text={'로그인'}
            />
          )}
        </nav>
      </div>
    </>
  );
}
