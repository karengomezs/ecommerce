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
        className="w-[80%] border border-slate-300 bg-slate-100 rounded-md "
      >
        <Image
          width={300}
          height={200}
          className="rounded-t-md object-cover h-[250px]"
          src={product.img}
          alt=""
        />
        <div className="px-2 grid gap-2">
          <p className="font-bold mt-3">{product.name}</p>
          <p>
            <span className="text-red-600 font-bold">Seller:</span>{" "}
            {product.userName}
          </p>
          <p className=" text-red-600 font-bold">$ {product.price}</p>
          <button
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
