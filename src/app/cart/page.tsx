"use client";

import { useContext } from "react";
import CartContext from "../context/cart-context";

export default function Cart() {
  const cartState = useContext(CartContext);

  const cartProducts = cartState?.items.map((product) => {
    return (
      <div
        key={product.id}
        className="w-full flex h-32 border border-rose-700 rounded-md "
      >
        <img
          width={250}
          height={90}
          className="rounded-s-md object-cover "
          //   src="/imagen.jpg"
          src={product.img}
          alt=""
        />
        <div className="w-full flex items-center justify-between px-10">
          <p className="font-bold">Product: cualquier cosa</p>
          <p className="font-bold text-rose-600">Price: $584</p>
          <div className="flex gap-4  rounded-md [&>*]:bg-slate-300 [&>*]:px-4 [&>*]:rounded-md">
            <button>-</button>
            <button>+</button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="px-24">
      <main className="flex flex-col justify-center gap-4">{cartProducts}</main>
    </div>
  );
}
