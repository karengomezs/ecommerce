"use client";
import { ChangeEvent, useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { useUser } from "@clerk/nextjs";
import { saveProduct, uploadImage } from "@/api/products";

const schema = z
  .object({
    name: z.string().min(3, { message: "Product name is required!" }),
    price: z.number(),
    img: z.object({ file: z.instanceof(File) }),
  })
  .required();

type Form = z.infer<typeof schema>;

export default function FormProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  console.log(errors);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      if (!user?.id) return;

      console.log(data);

      // setButtonDisable(true);

      // const img = await uploadImage(productImg);

      // let product: Product = {
      //   id: "",
      //   name: productName,
      //   price: productPrice,
      //   img: img.urlImg,
      //   userId: user?.id,
      //   userName: user?.fullName ?? "",
      //   date: new Date(),
      // };

      // const doc = await saveProduct(product);
      // product.id = doc?.id ?? Date.now().toString();

      //     setPostsArray([post, ...postsArray]);
      // setProductImg(undefined);
      // setProductName("");
      // setProductPrice(0);
      //this function clear all form elements
      // ref.current?.reset();

      // setProductPosted(true);
      // setButtonDisable(false);
    } catch (error) {
      // console.error(error);
      // setButtonDisable(false);
    }
  };

  // -----------------------------------

  const ref = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImg, setProductImg] = useState<File>();
  const [productPosted, setProductPosted] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-1/2 py-8 px-14  bg-white text-black font-semibold">
      <h2 className="text-2xl mb-5">Create a product</h2>
      <Form.Root
        ref={ref}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={async (e) => {
        //   e.preventDefault();

        //   try {
        //     if (!productImg || !user?.id) return;

        //     setButtonDisable(true);

        //     const img = await uploadImage(productImg);

        //     let product: Product = {
        //       id: "",
        //       name: productName,
        //       price: productPrice,
        //       img: img.urlImg,
        //       userId: user?.id,
        //       userName: user?.fullName ?? "",
        //       date: new Date(),
        //     };

        //     const doc = await saveProduct(product);
        //     product.id = doc?.id ?? Date.now().toString();

        //     //     setPostsArray([post, ...postsArray]);
        //     setProductImg(undefined);
        //     setProductName("");
        //     setProductPrice(0);
        //     //this function clear all form elements
        //     ref.current?.reset();

        //     setProductPosted(true);
        //     setButtonDisable(false);
        //   } catch (error) {
        //     console.error(error);
        //     setButtonDisable(false);
        //   }
        // }}
      >
        <Form.Field name="name">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Name</Form.Label>
            <Form.Control asChild>
              <input
                {...register("name")}
                // onChange={(e) => {
                //   setProductName(e.target.value);
                //   setProductPosted(false);
                // }}
                // value={productName}
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
                // type="text"
                // required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field name="price">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Price</Form.Label>
            <Form.Control asChild>
              <input
                {...register("price", {
                  setValueAs: (value) => {
                    return value === "" ? undefined : parseInt(value, 10);
                  },
                })}
                // onChange={(e) => {
                //   setProductPrice(parseInt(e.target.value));
                // }}
                // value={productPrice}
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
                type="number"
                // required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Field name="image">
          <div className="flex flex-col gap-1">
            <Form.Label className="">Image</Form.Label>
            <Form.Control asChild>
              <input
                {...register("img")}
                // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                //   setProductImg(e.target.files?.[0]);
                // }}
                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
                type="file"
                // required
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button
            // disabled={buttonDisable}
            type="submit"
            className="w-full mx-auto rounded-md bg-emerald-900 hover:bg-emerald-700 text-white font-bold p-2 my-2"
          >
            {buttonDisable ? <p>Creating product</p> : <p>Post Product</p>}
          </button>
        </Form.Submit>

        {productPosted && <p>Product Posted!</p>}
      </Form.Root>
    </div>
  );
}
