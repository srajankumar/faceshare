import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Logout from "../Logout";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetUserID } from "@/hooks/useGetUserID";
import { Button } from "../ui/button";

interface Profile {
  userOwner: string | null;
  _id: string;
  name: string;
  bio: string;
  username: string;
  links: string[];
  imageUrl: string;
}

interface ProfilesGridProps {
  selectedProfileId: string | null;
}

const ProfilesGrid: React.FC<ProfilesGridProps> = ({ selectedProfileId }) => {
  const [loading, setLoading] = useState(true);
  const [savedProfiles, setSavedProfiles] = useState<Profile[]>([]);

  const userID = useGetUserID();

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchSavedProfile = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/profiles/savedProfiles/${userID}`
        );
        setSavedProfiles(response.data.savedProfiles);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedProfile();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 min-h-[100dvh]">
      <h1 className="md:text-5xl text-4xl md:mb-20 mb-10 md:mt-32 mt-24 sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
        Your Vault of Saved Faces
      </h1>
      {!loading && savedProfiles.length > 0 ? (
        <div className="w-full justify-center items-center max-w-7xl md:flex flex-wrap">
          {savedProfiles.map((profile) => (
            <Link
              key={profile._id}
              className="w-fit m-5 hover:scale-[102%] transition-all duration-200"
              href={`https://faceshare.vercel.app/${profile.username}`}
            >
              <div className="flex border hover:border-primary/50 transition-all duration-200 rounded-2xl h-40 md:w-80 flex-col justify-center items-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={profile.imageUrl}
                    className="object-cover"
                  />
                  <AvatarFallback>{profile.username}</AvatarFallback>
                </Avatar>
                <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                  <div className="flex w-full justify-end items-center max-w-md">
                    <div className="w-20 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                    <div className="text-xs">@{profile.username}</div>
                  </div>
                  {profile.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : !loading && savedProfiles.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full md:mb-20 mb-10 max-w-xl">
          <div className="pt-2 mt-40 md:mt-32 text-primary/50 mb-5 px-5">
            You haven&apos;t saved any faces yet.
          </div>
          <Link href="/search">
            <Button>Search Faces</Button>
          </Link>
        </div>
      ) : (
        <div className="w-full justify-center items-center max-w-7xl md:flex flex-wrap">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="md:w-fit w-full md:m-5 my-5 hover:scale-[102%] transition-all duration-200"
              >
                <div className="flex border rounded-2xl h-40 md:w-80 w-full flex-col justify-center items-center">
                  <Skeleton className="rounded-full w-20 h-20"></Skeleton>
                  <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                    <div className="flex w-full justify-end items-center max-w-md">
                      <div className="w-20 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                      <Skeleton className="w-20 h-3" />{" "}
                    </div>
                    <Skeleton className="w-32 h-3 mt-3" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesGrid;
