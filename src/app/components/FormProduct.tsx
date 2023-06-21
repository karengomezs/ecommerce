"use client";
import { saveProduct, uploadImage } from "@/api/products";
import { useUser } from "@clerk/nextjs";
import * as Form from "@radix-ui/react-form";
import { ChangeEvent, useState, useRef } from "react";

export default function FormProduct() {
  const ref = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImg, setProductImg] = useState<File>();
  const [productPosted, setProductPosted] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  return (
    <div className=" flex flex-col items-center mx-auto mt-16  w-96 py-8 px-14 rounded-md border border-slate-300 text-black font-semibold">
      <h2 className="text-2xl mb-5">Create a product</h2>
      <Form.Root
        ref={ref}
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            if (!productImg) return;

            setButtonDisable(true);

            const img = await uploadImage(productImg);

            let product: Product = {
              id: "",
              name: productName,
              price: productPrice,
              img: img.urlImg,
              userId: user?.id ?? "",
              userName: user?.fullName ?? "",
              date: new Date(),
            };

            const doc = await saveProduct(product);
            product.id = doc?.id ?? Date.now().toString();

            //     setPostsArray([post, ...postsArray]);
            setProductImg(undefined);
            setProductName("");
            setProductPrice(0);
            //this function clear all form elements
            ref.current?.reset();

            setProductPosted(true);
            setButtonDisable(false);
          } catch (error) {
            console.error(error);
            setButtonDisable(false);
          }
        }}
      >
        <Form.Field className="mx-auto" name="name">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Name</Form.Label>
            <Form.Control asChild>
              <input
                onChange={(e) => {
                  setProductName(e.target.value);
                  setProductPosted(false);
                }}
                value={productName}
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
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
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProductImg(e.target.files?.[0]);
                }}
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
                type="file"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button
            disabled={buttonDisable}
            type="submit"
            className="w-60 p-2 mt-3 mx-auto rounded-md bg-emerald-900 hover:bg-emerald-700 text-white font-bold p-2 my-2"
          >
            {buttonDisable ? <p>Creating product</p> : <p>Post Product</p>}
          </button>
        </Form.Submit>

        {productPosted && <p>Product Posted!</p>}
      </Form.Root>
    </div>
  );
}
