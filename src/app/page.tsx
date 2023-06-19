import { SignedOut } from "@clerk/nextjs";
import { getproducts } from "@/api/products";
import Image from "next/image";

export default async function Home() {
  const arrayProducts = await getproducts();
  const productsData = arrayProducts?.docs.map((product) => {
    let data = product.data();
    return { id: product.id, ...data };
  }) as Product[];

  const products = productsData.map((product) => {
    return (
      <div key={product.id} className="w-60 border border-rose-700 rounded-md ">
        <Image
          width={240}
          height={150}
          className="rounded-t-md object-cover"
          src="/imagen.jpg"
          alt=""
        />
        <div className="px-2">
          <p>{product.name}</p>
          <p>{product.userName}</p>
          <p className="mt-3">${product.price}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="px-24">
      <h1>holas here are my products</h1>
      <div className="grid grid-cols-4 gap-5">{products}</div>
    </div>
  );
}
