import { IoClose, IoMenuOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { MenuContext } from '@/context/MenuContext.tsx';

export default function MenuTrigger() {
  const { isOpen, toggleMenuHandler } = useContext(MenuContext);

  return (
    <>
      <div
        data-cy={'header-dropdown-trigger'}
        className={'focus-visible:outline-none cursor-pointer p-3'}
        onClick={toggleMenuHandler}>
        {isOpen ? <IoClose size={20} /> : <IoMenuOutline size={20} />}
      </div>
    </>
  );
}
