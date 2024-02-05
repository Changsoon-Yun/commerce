import { createContext, ReactNode, useState } from 'react';

const CartContext = createContext({
  carts: [] as string[],
  isOpen: false,
  addCart: (_id: string) => {},
  removeCart: (_id: string) => {},
  closeHandler: () => {},
  openHandler: () => {},
});
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useState<string[]>(JSON.parse(localStorage.getItem('cart') ?? '[]'));
  const [isOpen, setIsOpen] = useState(false);

  const addCart = (id: string) => {
    const storedItem = JSON.parse(localStorage.getItem('cart') ?? '[]');
    if (storedItem.includes(id)) {
      return;
    }
    storedItem.push(id);
    localStorage.setItem('cart', JSON.stringify(storedItem));
    setCarts([...carts, id]);
  };

  const removeCart = (id: string) => {
    const storedItem = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const a = storedItem.filter((item: string) => {
      return id !== item;
    });

    localStorage.setItem('cart', JSON.stringify(a));
    setCarts(a);
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };
  const value = { carts, isOpen, addCart, openHandler, closeHandler, removeCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
