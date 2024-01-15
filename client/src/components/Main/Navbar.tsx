"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

import axios from "axios";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useState, useEffect, ChangeEvent } from "react";

interface Profile {
  name: string;
  bio: string;
  imageUrl: string;
  links: string[];
  userOwner: string | null;
  username: string | null;
}

function Navbar() {
  const [existingProfile, setExistingProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState([]);
  const userID = useGetUserID();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${serverUrl}/profiles`);
        setProfiles(response.data);

        const existingProfile = response.data.find(
          (profile: { userOwner: string | null }) =>
            profile.userOwner === userID
        );

        setExistingProfile(existingProfile);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfiles();
  }, [userID]);
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
            className="w-7 h-7"
          ></Image>
          <p className="font-semibold pl-1">Face Share</p>{" "}
        </Link>
        {existingProfile ? (
          <Link href="/admin">
            <Button>My Face</Button>
          </Link>
        ) : (
          <div className="flex gap-x-3">
            <Link href="/register">
              <Button variant={"ghost"}>Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
