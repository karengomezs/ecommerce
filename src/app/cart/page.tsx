"use client";

import { useContext, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CartContext from "../context/cart-context";
import { deletePost, getproducts, saveToCart } from "@/api/cart";

export default function Cart() {
  const { user } = useUser();
  const cartState = useContext(CartContext);

  useEffect(() => {
    if (user?.id) {
      getproducts(user?.id).then((data) => {
        const newArray = data?.docs.map((product) =>
          product.data()
        ) as Product[];
        cartState.setItems(newArray);
      });
    }
  }, [user?.id]);
  console.log(cartState?.items);

  //esto es para eliminar los elementos duplicados en valor de ese array del estado global
  const unique = [...new Map(cartState.items.map((m) => [m.id, m])).values()];

  let products = [...unique].sort((a, b) => {
    //este sort es para ordenarlos en la página donde se renderiza por los id de cada elemento
    return a.id.localeCompare(b.id);
  });

  const suma = cartState.items.reduce((acumulador, product) => {
    return acumulador + product.price;
  }, 0);

  //acá renderizo ya el array sin elementos duplicados
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
              onClick={async () => {
                try {
                  if (user?.id) {
                    await deletePost(user.id, product.id);
                    //necesito eliminar el elemento que seleccioné del array

                    const index = cartState.items.findIndex(
                      //comparo cual id de los elementos del array del estado global, coincide con uno
                      //de los elementos que estoy renderizando en el nuevo array y me devuelve el índice
                      //del primero que coincida, esto porque puedo tener más de un articulo con el mismo id
                      //en el carrito, ej: 2 gorras con el id: 7645 y solo quiero que me elimine de a una
                      (e) => e.id === product.id
                    );

                    //hago una copia del original para no mutarlo
                    let newArray = [...cartState.items];
                    //le digo a ese array copia, que elimine ese unico indice que le pasé
                    newArray.splice(index, 1);
                    //ahora al estado global le paso el array copia ya actualizado con todos los que quedan
                    //menos el eliminado
                    cartState.setItems([...newArray]);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              -
            </button>
            {/* por cada iteración, saco el largo del array que me da las coincidencias entre ids */}
            <p>{idRep.length}</p>
            <button
              onClick={async () => {
                try {
                  if (user?.id) {
                    await saveToCart(user?.id, product);

                    //cada vez que clickeo el botón de "+" vuelvo y agrego el elemento al context
                    // cartState.setItems([product, ...cartState.items]);
                    //ese parámetro es el estado actual, current items es el último estado que haya quedado
                    //en el estado, es lo mismo que la línea de arriba pero esta es la forma recomendada

                    cartState.setItems((currentItems) => [
                      product,
                      ...currentItems,
                    ]);
                  }
                } catch (error) {
                  console.log(error);
                }
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
      <main className="flex flex-col justify-center gap-4">
        {cartState.items.length !== 0 ? (
          cartProducts
        ) : (
          <p>Still you don´t have anything in your cart</p>
        )}
      </main>
      <h1>TOTAL: {suma}</h1>
    </div>
  );
}
