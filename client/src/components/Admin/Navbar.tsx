"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Logout from "../Logout";
import {
  Star,
  AlignRight,
  Home,
  Search,
  LogOut,
  Github,
  User,
} from "lucide-react";

import { useCookies } from "react-cookie";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface GitHubStarButtonProps {
  owner: string;
  repo: string;
}

const GitHubStarButton: React.FC<GitHubStarButtonProps> = ({ owner, repo }) => {
  const [starCount, setStarCount] = useState(null);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        setStarCount(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub star count:", error);
      }
    };

    fetchStarCount();
  }, [owner, repo]);

  return (
    <Button variant={"outline"} className="flex gap-2">
      <Star className="w-5 h-5 text-primary/50" />
      <p>Star on GitHub</p>
      {starCount !== null ? `${starCount}` : ""}
    </Button>
  );
};

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token", "username"]);

  const logout = () => {
    setCookies("access_token", "");
    setCookies("username", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md flex items-center py-4 px-8">
      <div className="hidden md:flex lg:container items-center w-full justify-between">
        <div className="flex items-center gap-x-3">
          <Link className="flex mr-3 items-center space-x-1" href="/admin">
            <Image
              src="/globe.png"
              alt="icon"
              width={500}
              height={500}
              className="w-10 h-10 py-1 pr-2"
            ></Image>
            <p className="font-semibold">Face Share</p>{" "}
          </Link>
          <div className="flex gap-5">
            <Link
              href="/search"
              className="text-primary/70 hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Search className="w-5 h-5" />
              <p>Search</p>
            </Link>
            <Link
              href="/faces"
              className="text-primary/70 hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <User className="w-5 h-5" />
              <p>Faces</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Link
            href="https://github.com/srajankumar/faceshare/stargazers"
            target="_blank"
          >
            <GitHubStarButton owner="srajankumar" repo="faceshare" />
          </Link>
          <Logout />
        </div>
      </div>
      <div className="flex md:hidden justify-between items-center w-full">
        <Link className="flex mr-3 items-center space-x-1" href="/admin">
          <Image
            src="/globe.png"
            alt="icon"
            width={500}
            height={500}
            className="w-10 h-10 py-1 pr-2"
          ></Image>
          <p className="font-semibold">Face Share</p>{" "}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <AlignRight className="w-8 h-8 focus:rotate-90" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              {/* <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
              <div className="flex my-5 justify-center items-center space-x-1">
                <Image
                  src="/globe.png"
                  alt="icon"
                  width={500}
                  height={500}
                  className="w-10 h-10 py-1 pr-2"
                ></Image>
                <p className="font-semibold text-xl">Face Share</p>{" "}
              </div>
            </SheetHeader>
            <div className="grid gap-5 py-4">
              <Link
                href="/admin"
                className="text-primary/70 hover:bg-primary-foreground px-3 py-4 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <Home className="w-7 h-7" />
                <p>Home</p>
              </Link>
              <Link
                href="/search"
                className="text-primary/70 hover:bg-primary-foreground px-3 py-4 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <Search className="w-7 h-7" />
                <p>Search</p>
              </Link>
              <Link
                href="/faces"
                className="text-primary/70 hover:bg-primary-foreground px-3 py-4 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <User className="w-5 h-5" />
                <p>Faces</p>
              </Link>
              <Link
                href="https://github.com/srajankumar/faceshare/stargazers"
                target="_blank"
                className="text-primary/70 hover:bg-primary-foreground px-3 py-4 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <Github className="w-7 h-7" />
                <p>Star on GitHub</p>
              </Link>
              <div
                onClick={logout}
                className="text-primary/70 absolute bottom-0 right-0 m-5 bg-red-900 hover:bg-red-950 w-[87%] hover:bg-primary-foreground px-3 py-4 rounded-md hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <LogOut className="w-7 h-7" />
                <p>Logout</p>
              </div>
            </div>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
