"use client";

import { useContext } from "react";
import CartContext from "../context/cart-context";

export default function Cart() {
  const cartState = useContext(CartContext);

  console.log(cartState?.items);

  return (
    <>
      <h1>Products you want to shop!</h1>
      <main></main>
    </>
  );
}
