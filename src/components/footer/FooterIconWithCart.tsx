import { ElementType, useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import { useAuth } from '@/apis/useAuth.ts';

interface FooterIconWithCart {
  icon: ElementType;
  exactIcon: ElementType;
  text: string;
}

export default function FooterIconWithCart({
  icon: Icon,
  exactIcon: ExactIcon,
  text,
}: FooterIconWithCart) {
  const { carts, isOpen, toggleHandler } = useContext(CartContext);
  const { storedUserData } = useAuth();
  const checkUser = () => {
    if (!storedUserData) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    toggleHandler();
  };
  return (
    <div>
      <div
        onClick={checkUser}
        className={
          'flex flex-col items-center justify-center gap-1 p-3 font-semibold cursor-pointer'
        }>
        <div className={'relative'}>
          {isOpen ? <ExactIcon size={20} /> : <Icon size={20} />}
          {carts.length > 0 && storedUserData && (
            <small
              data-testid={'cart-count'}
              className={
                'absolute top-[-4px] right-[-4px] rounded-full w-[16px] h-[16px] flex items-center justify-center bg-[#f6d0cb]'
              }>
              {carts.length}
            </small>
          )}
        </div>
        <small>{text}</small>
      </div>
    </div>
  );
}
