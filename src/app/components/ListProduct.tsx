"use client";

import { useContext } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartContext from "../context/cart-context";
import { saveToCart } from "@/api/cart";

export default function ListProducts({
  productsData,
}: {
  productsData: Product[];
}) {
  const router = useRouter();
  const { user } = useUser();
  const cartState = useContext(CartContext);

  const products = productsData.map((product) => {
    return (
      <div
        key={product.id}
        className="grid border border-slate-300 bg-slate-100 hover:brightness-90 cursor-pointer"
      >
        <Image
          width={150}
          height={100}
          className="col-start-1 row-start-1 object-cover min-w-[285px] h-[350px]"
          src={product.img}
          alt=""
        />
        <div className=" col-start-1 row-start-1 items-end grid grid-rows-[auto_1fr] gap-2">
          <div className="bg-slate-700/50 p-2 text-white">
            <p className="text-xl font-extrabold ">{product.name}</p>
            <p className="">$ {product.price}</p>
            <p className="text-xs  font-bold">
              by <span className="text-slate-300">{product.userName}</span>
            </p>
          </div>
          <button
            className="col-start-1 row-start-1 transition ease-in-out hover:scale-125 ml-auto text-white font-bold p-2 my-2"
            onClick={async () => {
              try {
                if (user?.id) {
                  await saveToCart(user?.id, product);
                  cartState.setItems([product, ...cartState.items]);
                } else {
                  router.push("/sign-in");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-wrap justify-items-center gap-2">{products}</div>
  );
}
