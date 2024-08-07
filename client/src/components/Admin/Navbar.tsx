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
  Palette,
  Save,
  Edit,
} from "lucide-react";

import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const logout = () => {
    setCookies("access_token", "");
    setCookies("username", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="fixed w-full z-50 bg-background backdrop-blur-md flex items-center py-5 px-5">
      <div className="hidden lg:flex lg:container items-center w-full justify-between">
        <div className="flex items-center gap-x-3">
          <Link className="flex mr-3 items-center space-x-1" href="/admin">
            <Image
              src="/globe.png"
              alt="icon"
              width={500}
              height={500}
              className="w-7 h-7"
            ></Image>
            <p className="font-semibold pl-1">Face Share</p>{" "}
          </Link>
          <div className="flex gap-3">
            <Link
              href="/edit"
              className={`${
                pathname == "/edit" ? "text-primary" : "text-primary/70"
              } transition-all duration-300 flex items-center text-sm`}
            >
              <Button
                className="flex gap-2"
                variant={pathname == "/edit" ? "secondary" : "ghost"}
              >
                <Edit className="w-5 h-5" />
                <p>Edit</p>
              </Button>
            </Link>
            <Link
              href="/appearance"
              className={`${
                pathname == "/appearance" ? "text-primary" : "text-primary/70"
              } transition-all duration-300 flex items-center text-sm`}
            >
              <Button
                className="flex gap-2"
                variant={pathname == "/appearance" ? "secondary" : "ghost"}
              >
                <Palette className="w-5 h-5" />
                <p>Appearance</p>
              </Button>
            </Link>
            <Link
              href="/search"
              className={`${
                pathname == "/search" ? "text-primary" : "text-primary/70"
              } transition-all duration-300 flex items-center text-sm`}
            >
              <Button
                className="flex gap-2"
                variant={pathname == "/search" ? "secondary" : "ghost"}
              >
                <Search className="w-5 h-5" />
                <p>Search</p>
              </Button>
            </Link>
            <Link
              href="/faces"
              className={`${
                pathname == "/faces" ? "text-primary" : "text-primary/70"
              } transition-all duration-300 flex items-center text-sm`}
            >
              <Button
                className="flex gap-2"
                variant={pathname == "/faces" ? "secondary" : "ghost"}
              >
                <User className="w-5 h-5" />
                <p>Faces</p>
              </Button>
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
      <div className="flex lg:hidden justify-between items-center w-full">
        <Link className="flex mr-3 items-center space-x-1" href="/admin">
          <Image
            src="/globe.png"
            alt="icon"
            width={500}
            height={500}
            className="w-5 h-5"
          />
        </Link>
        <Link
          href="/edit"
          className={`${
            pathname == "/edit" ? "text-primary" : "text-primary/70"
          } flex-col px-3 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg`}
        >
          <Button
            size={"icon"}
            variant={pathname == "/edit" ? "secondary" : "ghost"}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </Link>
        <Link
          href="/appearance"
          className={`${
            pathname == "/appearance" ? "text-primary" : "text-primary/70"
          } flex-col px-3 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg`}
        >
          <Button
            size={"icon"}
            variant={pathname == "/appearance" ? "secondary" : "ghost"}
          >
            <Palette className="w-5 h-5" />
          </Button>
        </Link>
        <Link
          href="/search"
          className={`${
            pathname == "/search" ? "text-primary" : "text-primary/70"
          } flex-col px-3 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg`}
        >
          <Button
            size={"icon"}
            variant={pathname == "/search" ? "secondary" : "ghost"}
          >
            <Search className="w-5 h-5" />
          </Button>
        </Link>
        <Link
          href="/faces"
          className={`${
            pathname == "/faces" ? "text-primary" : "text-primary/70"
          } flex-col px-3 rounded-md hover:text-primary transition-all duration-300 flex items-center gap-2 text-lg`}
        >
          <Button
            size={"icon"}
            variant={pathname == "/faces" ? "secondary" : "ghost"}
          >
            <Save className="w-5 h-5" />
          </Button>
        </Link>
        <div
          onClick={logout}
          className="text-red-500 bottom-0 right-0 ml-3 rounded-md transition-all duration-300 flex items-center justify-center gap-2 text-lg"
        >
          <LogOut className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
