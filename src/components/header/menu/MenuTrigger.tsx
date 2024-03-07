import { useContext } from 'react';
import { MenuContext } from '@/context/MenuContext.tsx';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoMenuOutline } from '@react-icons/all-files/io5/IoMenuOutline';

export default function MenuTrigger() {
  const { isOpen, toggleMenuHandler } = useContext(MenuContext);

  return (
    <>
      <div
        data-testid={'header-dropdown-trigger'}
        className={'focus-visible:outline-none cursor-pointer p-3'}
        onClick={toggleMenuHandler}>
        {isOpen ? <IoClose size={20} /> : <IoMenuOutline size={20} />}
      </div>
    </>
  );
}
