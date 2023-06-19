import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-24">
      <h1>holas here are my products</h1>
      <div className="grid grid-cols-4 gap-5">
        <div className="w-60 border border-rose-700 rounded-md ">
          <Image
            width={240}
            height={150}
            className="rounded-t-md object-cover"
            src="/imagen.jpg"
            alt=""
          />
          <div className="px-2">
            <p>cualquier cosa</p>
            <p>Karen Gómez</p>
            <p className="mt-3">$6584.98</p>
          </div>
        </div>
      </div>
    </div>
  );
}
