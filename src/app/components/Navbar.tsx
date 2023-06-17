import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-gray-900 text-white py-4 px-24">
        <ul className="flex justify-between items-center">
          <li>
            <Link className="text-lime-500  text-3xl font-bold" href="">
              TWILLY
            </Link>
          </li>
          <li>{/* <UserButton afterSignOutUrl="/" /> */}</li>
        </ul>
      </nav>
    </header>
  );
}
