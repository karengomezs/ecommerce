"use client";

import { useContext } from "react";
import Image from "next/image";
import CartContext from "../context/cart-context";
import { saveToCart } from "@/api/cart";
import { useUser } from "@clerk/nextjs";

export default function ListProducts({
  productsData,
}: {
  productsData: Product[];
}) {
  const { user } = useUser();
  const cartState = useContext(CartContext);

  const products = productsData.map((product) => {
    return (
      <div
        key={product.id}
        className="grid border border-slate-300 bg-slate-100 "
      >
        <Image
          width={150}
          height={100}
          className="col-start-1 row-start-1 object-cover min-w-[285px] h-[350px]"
          src={product.img}
          alt=""
        />
        <div className=" col-start-1 row-start-1 items-end  grid gap-2">
          <div className="bg-slate-700/50 p-2">
            <p className="text-xl font-extrabold text-white">{product.name}</p>
            <p className="text-xs text-white font-bold">
              by <span className="text-slate-300">{product.userName}</span>
            </p>
          </div>
          {/* <p className=" text-red-600 font-bold">$ {product.price}</p> */}
          {/* <button
            className="rounded-md bg-emerald-900 hover:bg-emerald-700 text-white font-bold p-2 my-2"
            onClick={async () => {
              try {
                if (user?.id) {
                  await saveToCart(user?.id, product);
                  cartState.setItems([product, ...cartState.items]);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Add to cart
          </button> */}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-wrap justify-items-center gap-2">{products}</div>
  );
}
