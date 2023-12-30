"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Qr from "@/components/qr";
import { QrCode } from "lucide-react";
export default function Username({ params }: { params: { username: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [qrCodeImage, setQrCodeImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${params.username}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
      }
    };

    fetchUserData();
  }, [params.username]);

  return (
    <div>
      {userData ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Avatar className="w-40 h-40">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
            <p className="sm:max-w-md my-3 text-center">{userData.bio}</p>
            <div className="flex w-full justify-end items-center max-w-md">
              <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
              <div className="text-xl">{userData.name}</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="mt-3 w-full border-2 hover:border-white transition-all duration-300 bg-primary/10 px-5 py-2 rounded-lg">
                {"Portfolio ->"}
              </div>
              <div className="mt-3 w-full border-2 hover:border-white transition-all duration-300 bg-primary/10 px-5 py-2 rounded-lg">
                {"Instagram ->"}
              </div>
              <div className="mt-3 w-full border-2 hover:border-white transition-all duration-300 bg-primary/10 px-5 py-2 rounded-lg">
                {"Twitter ->"}
              </div>
              <div className="mt-3 w-full border-2 hover:border-white transition-all duration-300 bg-primary/10 px-5 py-2 rounded-lg">
                {"Spotify ->"}
              </div>
            </div>
            <div className="mt-5 flex items-center space-x-10">
              <Github className="hover:scale-110 transition-all duration-300" />
              <Github className="hover:scale-110 transition-all duration-300" />
              <Github className="hover:scale-110 transition-all duration-300" />
              <Github className="hover:scale-110 transition-all duration-300" />
              <Github className="hover:scale-110 transition-all duration-300" />
              <QrCode className="hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          {/* <Qr id={userData.login} /> */}
          {/* <p>Name: {userData.name}</p>
          <p>Followers: {userData.followers}</p> */}
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
