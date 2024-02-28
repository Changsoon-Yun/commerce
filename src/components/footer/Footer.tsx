import { useAuth } from '@/apis/useAuth.ts';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoHeart, IoHeartOutline, IoLogInOutline } from 'react-icons/io5';
import { FaList } from 'react-icons/fa';
import FooterIconWithCart from '@/components/footer/FooterIconWithCart.tsx';
import FooterIconWithLabel from '@/components/footer/FooterIconWithLabel.tsx';

export default function Footer() {
  const { storedUserData } = useAuth();

  return (
    <>
      <div className={''}>
        <nav className={'flex justify-around'}>
          <FooterIconWithLabel to={'/'} icon={GoHome} exactIcon={GoHomeFill} text={'홈'} />
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
