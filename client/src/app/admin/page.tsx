"use client";

import Edit from "@/components/Admin/Edit";
import Navbar from "@/components/Admin/Navbar";
import ProfilesGrid from "@/components/Search/ProfilesGrid";
import Logout from "@/components/Logout";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Edit />
      <Footer />
    </div>
  );
};

export default Home;
