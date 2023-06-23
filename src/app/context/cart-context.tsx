"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
import { getproducts } from "@/api/cart";

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
  const { user } = useUser();

  const [items, setItems] = useState<CartContext["items"]>([]);

  useEffect(() => {
    if (user?.id) {
      getproducts(user?.id).then((data) => {
        const newArray = data?.docs.map((product) =>
          product.data()
        ) as Product[];
        setItems(newArray);
      });
    }
  }, [user?.id]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
