import { createContext, ReactNode, useState } from 'react';

const MenuContext = createContext({
  isOpen: false,
  toggleMenuHandler: () => {},
  closeMenuHandler: () => {},
});
const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuHandler = () => {
    setIsOpen(() => false);
  };
  const value = { isOpen, toggleMenuHandler, closeMenuHandler };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuProvider };
