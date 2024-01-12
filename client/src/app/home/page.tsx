"use client";

import Edit from "@/components/Home/Edit";
import Navbar from "@/components/Home/Navbar";
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
      <div className="grid md:grid-cols-2">
        <div>
          <Edit />
        </div>
        <div className="xl:flex w-full justify-center items-center">
          <div className="flex flex-col p-8 md:min-h-screen justify-center">
            <h1 className="text-4xl md:mb-5 mb-10  sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
              Saved faces
            </h1>
            <ScrollArea className="md:h-[60vh] h-[65vh] relative">
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black pointer-events-none z-50"></div>
              <div className="w-full flex flex-col gap-5 xl:grid grid-cols-2">
                <Link
                  href="/"
                  // key={profile._id}
                  className="xl:w-fit w-full transition-all duration-200"
                  // href={`https://faceshare.vercel.app/${profile.username}`}
                >
                  <div className="flex border hover:border-white transition-all duration-200 rounded-2xl h-40 flex-col justify-center items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="" />
                      <AvatarFallback>srajankumar</AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                      <div className="flex w-full justify-end items-center max-w-md">
                        <div className="w-20 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                        <div className="text-xs">@srajankumar</div>
                      </div>
                      Srajan Kumar
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
