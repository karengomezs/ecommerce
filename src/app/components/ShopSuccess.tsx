"use client";

import { useRouter } from "next/navigation";

export default function SuccessMessaje() {
  const router = useRouter();

  return (
    <div className="bg h-full flex">
      <div className="w-[30%] py-10 px-5 rounded-md bg-white m-auto flex flex-col text-center gap-10">
        <p className="font-bold text-xl">¡Thanks for your purchase! </p>
        <p>
          We are working on sending your products, soon you will be able to
          enjoy them
        </p>
        <p className="font-bold">🌟COME BACK SOON🌟</p>
        <button
          className="bg-emerald-900 rounded-md p-2 text-white font-bold text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
