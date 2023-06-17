"use client";
import { saveProduct } from "@/api/products";
import { useUser } from "@clerk/nextjs";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

export default function FormProduct() {
  const { user } = useUser();
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImg, setProductImg] = useState<string>("");

  console.log({ productName, productPrice, productImg });

  return (
    <div className="flex flex-col items-center mt-40 text-black font-semibold">
      <h2 className="text-2xl mb-5">Create a product</h2>
      <Form.Root
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          console.log("hola");

          try {
            let product: Product = {
              id: "",
              name: productName,
              price: productPrice,
              img: productImg,
              userId: user?.id ?? "",
              userName: user?.fullName ?? "",
              date: new Date(),
            };

            console.log({ product });

            const doc = await saveProduct(product);
            product.id = doc?.id ?? Date.now().toString();

            console.log({ doc });

            //     setPostsArray([post, ...postsArray]);
            //     setPostContent("");
          } catch (error) {
            console.error(error);
          }

          //   } catch (error) {
          //     console.error(error);
          //   }
        }}
      >
        <Form.Field className="mx-auto" name="name">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Name</Form.Label>
            <Form.Control asChild>
              <input
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                value={productName}
                className="w-60 p-2 rounded-md border border-rose-300"
                type="text"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="mx-auto" name="price">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Price</Form.Label>
            <Form.Control asChild>
              <input
                onChange={(e) => {
                  setProductPrice(parseInt(e.target.value));
                }}
                value={productPrice}
                className="w-60 p-2 rounded-md border border-rose-300"
                type="text"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field className="mx-auto" name="image">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Image</Form.Label>
            <Form.Control asChild>
              <input
                onChange={(e) => {
                  setProductImg(e.target.value);
                }}
                className="w-60 p-2 rounded-md border border-rose-300"
                type="text"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="w-60 p-2 mt-3 mx-auto rounded-md bg-rose-500 hover:bg-rose-600 hover:text-white  text-center font-bold"
          >
            Post Product
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
