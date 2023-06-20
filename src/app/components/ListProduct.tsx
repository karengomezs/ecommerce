"use client";

import { useContext } from "react";
import Image from "next/image";
import CartContext from "../context/cart-context";

// interface props {
//   productsData: Product[];
// }

export default function ListProducts({
  productsData,
}: {
  productsData: Product[];
}) {
  const cartState = useContext(CartContext);

  const products = productsData.map((product) => {
    return (
      <div
        key={product.id}
        className="w-[80%] border border-rose-700 rounded-md "
      >
        <Image
          width={300}
          height={150}
          className="rounded-t-md object-cover"
          src={product.img}
          alt=""
        />
        <div className="px-2 grid">
          <p>{product.name}</p>
          <p>{product.userName}</p>
          <p className="mt-3">${product.price}</p>
          <button
            className="bg-rose-200 p-2 my-2"
            onClick={() => {
              cartState.setItems(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-4 justify-items-center gap-5">
      {products}
    </div>
  );
}
