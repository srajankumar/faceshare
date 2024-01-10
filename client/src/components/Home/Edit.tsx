"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";

import { QrCode, Pencil, Save, Plus, Minus } from "lucide-react";
import Qr from "@/components/qr";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useGetUserID } from "../../hooks/useGetUserID";
import { Label } from "../ui/label";

interface Profile {
  userOwner: string | null;
  _id: string;
  name: string;
  bio: string;
  username: string;
  links: string[];
  imageUrl: string;
}

const getIconForUrl = (url: string) => {
  if (url.includes("github")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
        />
      </svg>
    );
  } else if (url.includes("instagram")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
        />
      </svg>
    );
  } else if (url.includes("linkedin")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="31"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
        />
      </svg>
    );
  } else if (url.includes("twitter")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 16 16"
        className="hover:scale-110 py-0.5 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
        />
      </svg>
    );
  } else if (url.includes("spotify")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5c-.1-.4.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5"
        />
      </svg>
    );
  }
};

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([]);

  const userID = useGetUserID();

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleAdditionalLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLinks = [...additionalLinks];
    newLinks[index] = event.target.value;
    setAdditionalLinks(newLinks);
  };

  const addAdditionalLink = () => {
    setAdditionalLinks([...additionalLinks, ""]);
  };

  const removeAdditionalLink = (index: number) => {
    const newLinks = [...additionalLinks];
    newLinks.splice(index, 1);
    setAdditionalLinks(newLinks);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get<Profile[]>(`${server}/profiles`);
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleEditClick = (profile: Profile) => {
    // Initialize empty fields based on existing fields
    const emptyFields = {
      name: "",
      bio: "",
      links: Array(profile.links.length).fill(""),
    };

    // Set the selected profile state
    setSelectedProfile({ ...emptyFields, ...profile });
  };

  const handleSave = async () => {
    try {
      if (selectedProfile) {
        // Remove empty links
        const filteredLinks = selectedProfile.links.filter(
          (link) => link.trim() !== ""
        );

        const updatedProfile = {
          ...selectedProfile,
          links: [...filteredLinks, ...additionalLinks],
        };

        await axios.put(
          `${server}/profiles/${selectedProfile._id}`,
          updatedProfile
        );

        alert("Profile updated");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeLink = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!selectedProfile) {
      return;
    }
    const newLinks = [...selectedProfile.links];
    newLinks[index] = event.target.value;

    setSelectedProfile((prevProfile) => ({
      ...(prevProfile as Profile),
      links: newLinks,
    }));
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSelectedProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: value,
    }));
  };

  const addHttpPrefix = (link: string): string => {
    if (
      !link.startsWith("https://") &&
      !link.startsWith("http://") &&
      link.trim() !== ""
    ) {
      return `https://${link.trim()}`;
    }
    return link.trim();
  };

  return (
    <div>
      {!loading ? (
        <div className="flex w-full justify-center items-center">
          {!selectedProfile &&
            profiles
              .filter((profile) => profile.userOwner === userID)
              .slice(0, 1)
              .map((profile) => (
                <div key={profile._id}>
                  <div className="flex flex-col justify-center items-center min-h-screen">
                    <Avatar className="w-40 h-40">
                      <AvatarImage src={profile.imageUrl} />
                      <AvatarFallback>{profile.username}</AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                      <p className="sm:max-w-md my-3 text-center">
                        {profile.bio}
                      </p>
                      <div className="flex w-full justify-end items-center max-w-md">
                        <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                        <div className="text-xl">{profile.name}</div>
                      </div>
                      <div className="mt-2 sm:max-w-md flex flex-wrap items-center space-x-10">
                        <div className="flex flex-col">
                          <div className="flex flex-wrap">
                            {profile.links.map((link, index) => (
                              <div key={index}>
                                <Link
                                  href={addHttpPrefix(link)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {getIconForUrl(link)}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-4 space-x-4 w-full">
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full">
                            <Button className="w-full rounded-full">
                              <QrCode />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <Qr id={profile.username} />
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          className="rounded-full"
                          onClick={() => handleEditClick(profile)}
                        >
                          <Pencil className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div>
            {selectedProfile && (
              <div>
                <form onSubmit={handleSave}>
                  <div className="flex my-5 md:my-10 flex-col justify-center items-center min-h-screen">
                    <Avatar className="w-40 h-40">
                      <AvatarImage src={selectedProfile.imageUrl} />
                      <AvatarFallback>
                        {selectedProfile.username}
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                      <p className="sm:max-w-md my-3 text-center">
                        <Textarea
                          id="bio"
                          name="bio"
                          value={selectedProfile.bio}
                          onChange={handleChange}
                          className="sm:w-[28rem] w-[22rem]"
                          placeholder="Some cool bio"
                        />
                      </p>
                      <div className="flex w-full justify-end items-center max-w-md">
                        <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={selectedProfile.name}
                          onChange={handleChange}
                          className="sm:w-60 w-40"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="mt-2 sm:max-w-md flex flex-wrap items-center space-x-10">
                        <div className="flex flex-wrap flex-col">
                          <div className="flex justify-center items-center flex-col mb-2">
                            {selectedProfile.links.map((link, index) => (
                              <div key={index} className="flex items-center">
                                {getIconForUrl(link)}
                                <Input
                                  type="text"
                                  name={`links[${index}]`}
                                  value={link}
                                  onChange={(event) =>
                                    handleChangeLink(event, index)
                                  }
                                  className="ml-2 sm:w-96 w-72"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <div className="flex flex-col space-y-4">
                              <div className="space-y-3">
                                {additionalLinks.map((link, index) => (
                                  <div key={index} className="relative">
                                    <Input
                                      type="text"
                                      name="additionalLinks"
                                      placeholder={`Additional Link ${
                                        index + 1
                                      }`}
                                      value={link}
                                      onChange={(event) =>
                                        handleAdditionalLinkChange(event, index)
                                      }
                                    />
                                    <Button
                                      variant={"destructive"}
                                      className="w-6 h-6 p-2 absolute top-2 right-2 rounded-full"
                                      type="button"
                                      onClick={() =>
                                        removeAdditionalLink(index)
                                      }
                                    >
                                      <Minus className="w-10 h-10" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex pb-4 justify-center items-center">
                                <Label htmlFor="name">Add more links</Label>
                                <Button
                                  className="w-8 h-8 p-2 ml-4 rounded-full"
                                  type="button"
                                  onClick={addAdditionalLink}
                                >
                                  <Plus className="w-10 h-10" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button
                            className="sm:w-[28rem] w-[22rem]"
                            type="submit"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
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
  );
};

export default ProfilePage;
