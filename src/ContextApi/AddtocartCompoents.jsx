import React, { createContext, useState } from 'react'

export const AddtoCardWarpper = createContext();

export const AddtocartCompoents = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <AddtoCardWarpper.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </AddtoCardWarpper.Provider>
  );
};
