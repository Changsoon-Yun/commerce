import { FaRegHeart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';

export default function UserHeader() {
  const { carts, toggleHandler } = useContext(CartContext);
  return (
    <>
      <div className={'flex items-center gap-4'}>
        <div
          onClick={() => {
            toggleHandler();
          }}
          className={'relative p-4 cursor-pointer text-zinc-500 hover:text-zinc-600 transition'}>
          <FaRegHeart size={24} />
          {carts.length > 0 && (
            <div
              data-cy={'cart-count'}
              className={
                'absolute top-0 right-0 rounded-full w-[24px] h-[24px] flex items-center justify-center bg-[#f6d0cb] text-sm'
              }>
              {carts.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
