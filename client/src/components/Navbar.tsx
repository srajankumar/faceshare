"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <nav className="fixed w-full z-50 flex items-center py-4 px-5 bottom-0">
      <div className="flex my-2 lg:container items-center w-full justify-between">
        {existingProfile ? (
          <Link href="/admin">
            <Button variant={"outline"}>Back</Button>
          </Link>
        ) : (
          <Link className="flex py-2 items-center space-x-1" href="/">
            <Image
              src="/globe.png"
              alt="icon"
              width={500}
              height={500}
              className="w-5 h-5"
            ></Image>
            <p className="font-semibold text-sm pl-1">Face Share</p>{" "}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
