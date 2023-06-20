"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

//estos son los tipos
interface CartContext {
  items: Product[];
  setItems: Dispatch<SetStateAction<Product[] | []>>;
}

const CartContext = createContext<CartContext>({
  //estos son los valores iniciales del context
  items: [],
  setItems: () => {},
});

export const CartProvider = (props: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartContext["items"]>([]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
