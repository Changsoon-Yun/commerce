import { createContext, ReactNode, useState } from 'react';

interface MenuContextProps {
  isOpen: boolean;
  toggleMenuHandler: () => void;
  closeMenuHandler: () => void;
}

const MenuContext = createContext<MenuContextProps>({
  isOpen: false,
  toggleMenuHandler: () => {},
  closeMenuHandler: () => {},
});
const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenuHandler = () => {
    setIsOpen(() => false);
  };

  const value = { isOpen, toggleMenuHandler, closeMenuHandler };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuProvider };
