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
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  console.log(errors);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      if (!user?.id) return;

      console.log(data);

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

  return (
    <div className="flex flex-col items-center justify-center h-full w-1/2 py-8 px-14  bg-white text-black font-semibold">
      <h2 className="text-2xl mb-5">Create a product</h2>
      <Form.Root
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
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

                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
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

                className="w-full p-2 rounded-md border border-slate-300 bg-slate-100"
                type="number"
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
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full mx-auto rounded-md bg-emerald-900 hover:bg-emerald-700 text-white font-bold p-2 my-2"
          >
            {isSubmitting ? <p>Creating product</p> : <p>Post Product</p>}
          </button>
        </Form.Submit>

        {isSubmitSuccessful && <p>Product Posted!</p>}
      </Form.Root>
    </div>
  );
}
