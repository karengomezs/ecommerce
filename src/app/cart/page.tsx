"use client";

import { useContext } from "react";
import CartContext from "../context/cart-context";

export default function Cart() {
  const cartState = useContext(CartContext);

  const dataArr = new Set(cartState?.items);
  let products = [...dataArr].sort((a, b) => {
    //este sort es para ordenarlos en la página donde se renderiza por los id de cada elemento
    return a.id.localeCompare(b.id);
  });

  const cartProducts = products.map((product) => {
    //comparo el id de cada item del arreglo que está en el context, con los id del nuevo array sin
    //objetos duplicados, y solo me devuelve solo los elementos que coinciden por id comparando los dos arr
    const idRep = cartState.items.filter((p) => p.id === product.id);

    return (
      <div
        key={product.id}
        className="w-full flex h-32 border border-rose-700 rounded-md "
      >
        <img
          width={250}
          height={90}
          className="rounded-s-md object-cover "
          src={product.img}
          alt=""
        />
        <div className="w-full flex items-center justify-between px-10">
          <p className="font-bold"> {product.name}</p>
          <p className="font-bold text-rose-600">$ {product.price}</p>
          <div className="flex gap-4  rounded-md [&>*]:bg-slate-300 [&>*]:px-4 [&>*]:rounded-md">
            <button
              onClick={() => {
                const index = cartState.items.findIndex(
                  (e) => e.id === product.id
                );
                let newArray = [...cartState.items];
                newArray.splice(index, 1);
                cartState.setItems([...newArray]);
              }}
            >
              -
            </button>
            {/* por cada iteración, saco el largo del array que me da las coincidencias entre ids */}
            <p>{idRep.length}</p>
            <button
              onClick={() => {
                //cada vez que clickeo el botón de "+" vuelvo y agrego el elemento al context
                // cartState.setItems([product, ...cartState.items]);
                //ese parámetro es el estado actual, current items es el último estado que haya quedado
                //en el estado, es lo mismo que la línea de arriba pero esta es la forma recomendada
                cartState.setItems((currentItems) => [
                  product,
                  ...currentItems,
                ]);
              }}
            >
              +
            </button>
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
