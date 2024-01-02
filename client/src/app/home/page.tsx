"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { Github, QrCode } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Qr from "@/components/qr";
import Edit from "@/components/Edit";
import Logout from "@/components/Logout";
import React from "react";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);
  const [qrCodeImage, setQrCodeImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/srajankumar`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <Logout />
      <Edit />
      <div>
        {userData ? (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <Avatar className="w-40 h-40">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
              <p className="sm:max-w-md my-3 text-center">
                {userData.bio} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Optio doloribus blanditiis id itaque impedit
                facilis quae nobis inventore at nihil ipsa dicta ratione veniam
                magni, placeat eum eveniet possimus autem.
              </p>
              <div className="flex w-full justify-end items-center max-w-md">
                <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                <div className="text-xl">{userData.name}</div>
              </div>
              <div className="flex flex-col w-full">
                <div className="mt-3 w-full border-2 hover:border-white transition-all duration-300 bg-primary/10 px-5 py-2 rounded-lg">
                  {"Portfolio ->"}
                </div>
              </div>
              <div className="mt-2 sm:max-w-md flex flex-wrap items-center space-x-10">
                <div className="flex flex-wrap">
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <Github className="hover:scale-110 transition-all duration-300 m-3" />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <QrCode className="hover:scale-110 transition-all duration-300 m-3" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <Qr id={userData.login} />
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-screen justify-center items-center">
            <div className="max-w-xl flex flex-col justify-center items-center">
              <Skeleton className="w-40 mb-6 h-40 rounded-full" />
              <Skeleton className="w-80 mb-3 h-5 rounded-xl" />
              <div className="flex w-full justify-end items-center max-w-md">
                <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                <div className="text-xl">loading</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
