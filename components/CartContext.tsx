"use client";

import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  name: string;
  type: string;
  price: string;
  image_url: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
    toast("The figure has been added to your cart");
  };

  const removeFromCart = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const resetCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
