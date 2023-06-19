import { getproducts } from "@/api/products";
import ListProducts from "./components/ListProduct";

export default async function Home() {
  const arrayProducts = await getproducts();

  const productsData = arrayProducts?.docs.map((product) => {
    const data = product.data();
    const { date, ...rest } = data;

    return { id: product.id, date: date.toDate(), ...rest };
  }) as Product[];

  return (
    <div className="px-24">
      <h1>holas here are my products</h1>
      <ListProducts productsData={productsData} />
    </div>
  );
}
