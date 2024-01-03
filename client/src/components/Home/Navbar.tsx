"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md flex items-center py-4 px-8">
      <div className="flex lg:container items-center w-full justify-between">
        <Link className="flex items-center space-x-1" href="/">
          {/* <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-background via-[#8ebec0] to-[#f8914c]"></div> */}
          <Image
            src="/globe.png"
            alt="icon"
            width={500}
            height={500}
            className="w-10 h-10"
          ></Image>
          <p className="font-semibold">Face Share</p>{" "}
        </Link>

        <div className="flex gap-x-3">
          <Link href="/register">
            <Button variant={"ghost"}>Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
