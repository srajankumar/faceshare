"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";

import Link from "next/link";

import { QrCode, Pencil, Save, Plus, Minus } from "lucide-react";
import Qr from "@/components/qr";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useGetUserID } from "../../hooks/useGetUserID";
import { Label } from "@/components/ui/label";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Admin/Navbar";

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

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([]);
  const [image, setImage] = React.useState<string | null>(null);

  const userID = useGetUserID();

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  function convertToBase64(e: any) {
    const reader = new FileReader();
    const image = new Image();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        image.src = event.target.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 500;
          const maxHeight = 500;
          let width = image.width;
          let height = image.height;

          // Resize the image if it exceeds the maximum dimensions
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, width, height);

            // Convert canvas content to base64
            const base64 = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality as needed

            setImage(base64);
          }
        };
      }
    };

    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  }

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
        // Find the profile that matches the userID with userOwner
        const matchingProfile = response.data.find(
          (profile) => profile.userOwner === userID
        );

        // Initialize selectedProfile with the matching profile or a default profile if not found
        setSelectedProfile(
          matchingProfile || {
            userOwner: userID,
            _id: "",
            name: "",
            bio: "",
            username: "",
            links: [],
            imageUrl: "",
          }
        );
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [server, userID]);

  const handleSave = async () => {
    try {
      if (selectedProfile) {
        const filteredLinks = selectedProfile?.links.filter(
          (link) => link.trim() !== ""
        );

        const allLinks = [...filteredLinks, ...additionalLinks];

        const updatedProfile = {
          ...selectedProfile,
          links: allLinks.map(addHttpPrefix),
        };

        if (image) {
          updatedProfile.imageUrl = image;
        }

        await axios.put(
          `${server}/profiles/${selectedProfile?._id}`,
          updatedProfile
        );
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
    const newLinks = [...selectedProfile?.links];
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
      <Navbar />
      {!loading ? (
        <div className="flex justify-center items-center w-full">
          <div className="w-full">
            <div className="grid md:grid-cols-2">
              <Drawer>
                <DrawerTrigger className="md:hidden z-50 fixed bottom-10 flex w-full justify-center">
                  <Button
                    className="rounded-full px-10 backdrop-blur-sm"
                    variant={"secondary"}
                  >
                    Select
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <ScrollArea className="h-[500px] w-full rounded-md">
                    <form onSubmit={handleSave}>
                      <div className="flex xl:px-10 lg:mx-20 mx-8 py-10 flex-col items-center">
                        <div className="max-w-xl w-full flex flex-col mx-8 my-3">
                          <div className="text-2xl mb-5 font-semibold">
                            <p>Select Appearance</p>
                            <div className="w-full mt-2 rounded-full h-1 mr-2 bg-gradient-to-r from-[#8ebec0] via-[#f8914c] to-background" />
                          </div>
                          {/* <div className="flex w-full flex-col my-2 pb-2">
                            <Label className="mb-2">Name</Label>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={selectedProfile?.name}
                              onChange={handleChange}
                              className="w-full"
                              placeholder="Full Name"
                            />
                          </div>
                          <div className="flex flex-col w-full mb-2">
                            <Label className="pb-2">Bio</Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={selectedProfile?.bio}
                              onChange={handleChange}
                              className="w-full"
                              placeholder="Some cool bio"
                            />
                          </div>
                          <div className="flex w-full flex-col my-2">
                            <Label className="mb-2">Image</Label>
                            <Input
                              accept="image/*"
                              type="file"
                              onChange={convertToBase64}
                            />
                          </div>
                          <div className="mt-2 w-full flex flex-wrap items-center">
                            <div className="flex flex-wrap w-full flex-col">
                              <div className="flex justify-center items-center flex-col mb-2">
                                {selectedProfile?.links.map((link, index) => (
                                  <div
                                    key={index}
                                    className="flex w-full relative items-center"
                                  >
                                    {getIconForUrl(link)}
                                    <Input
                                      type="text"
                                      name={`links[${index}]`}
                                      value={link}
                                      onChange={(event) =>
                                        handleChangeLink(event, index)
                                      }
                                      className="ml-2 w-full"
                                    />
                                    <Button
                                      variant={"destructive"}
                                      className="w-6 absolute right-3 z- h-6 p-2 rounded-full"
                                      type="button"
                                      onClick={() => {
                                        const newLinks = [
                                          ...selectedProfile?.links,
                                        ];
                                        newLinks.splice(index, 1);
                                        setSelectedProfile((prevProfile) => ({
                                          ...(prevProfile as Profile),
                                          links: newLinks,
                                        }));
                                      }}
                                    >
                                      <Minus className="w-10 h-10" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-center items-center flex-col mb-2">
                                {additionalLinks.map((link, index) => (
                                  <div
                                    key={index}
                                    className="flex w-full items-center relative"
                                  >
                                    {getIconForUrl(link)}
                                    <Input
                                      type="text"
                                      name={`additionalLinks[${index}]`}
                                      placeholder={`Link ${index + 1}`}
                                      value={link}
                                      onChange={(event) =>
                                        handleAdditionalLinkChange(event, index)
                                      }
                                      className="ml-2 w-full"
                                    />
                                    <Button
                                      variant={"destructive"}
                                      className="w-6 absolute right-3 z- h-6 p-2 rounded-full"
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
                              <div className="flex flex-col space-y-1.5">
                                <div className="flex flex-col space-y-4">
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
                              <Button className="w-full" type="submit">
                                Save
                              </Button>
                            </div>
                          </div> */}
                          <div className="gap-10">
                            <Button
                              disabled
                              className="select-none mt-4 mb-8 w-full"
                            >
                              {"Default (Selected)"}
                            </Button>
                            <Button
                              variant={"vicecity"}
                              className="w-full mb-8"
                            >
                              {"Vice City (Coming soon)"}
                            </Button>
                            <Button variant={"coastal"} className="w-full mb-8">
                              {"Coastal (Coming soon)"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
              <form className="md:flex hidden" onSubmit={handleSave}>
                <div className="flex xl:px-10 lg:mx-20 mx-8 py-32 md:pt-32 md:pb-20 flex-col items-center min-h-[100dvh]">
                  <div className="max-w-xl w-full flex flex-col mx-8 my-3">
                    <div className="text-2xl mb-5 font-semibold">
                      <p>Select Appearance</p>
                      <div className="w-full mt-2 rounded-full h-1 mr-2 bg-gradient-to-r from-[#8ebec0] via-[#f8914c] to-background" />
                    </div>
                    {/* <div className="flex w-full flex-col my-2 pb-2">
                      <Label className="mb-2">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={selectedProfile?.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <Label className="pb-2">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={selectedProfile?.bio}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Some cool bio"
                      />
                    </div>
                    <div className="flex w-full flex-col my-2">
                      <Label className="mb-2">Image</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                      />
                    </div>
                    <div className="mt-2 w-full flex flex-wrap items-center">
                      <div className="flex flex-wrap w-full flex-col">
                        <div className="flex justify-center items-center flex-col mb-2">
                          {selectedProfile?.links.map((link, index) => (
                            <div
                              key={index}
                              className="flex w-full relative items-center"
                            >
                              {getIconForUrl(link)}
                              <Input
                                type="text"
                                name={`links[${index}]`}
                                value={link}
                                onChange={(event) =>
                                  handleChangeLink(event, index)
                                }
                                className="ml-2 w-full"
                              />
                              <Button
                                variant={"destructive"}
                                className="w-6 absolute right-3 z- h-6 p-2 rounded-full"
                                type="button"
                                onClick={() => {
                                  const newLinks = [...selectedProfile?.links];
                                  newLinks.splice(index, 1);
                                  setSelectedProfile((prevProfile) => ({
                                    ...(prevProfile as Profile),
                                    links: newLinks,
                                  }));
                                }}
                              >
                                <Minus className="w-10 h-10" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center items-center flex-col mb-2">
                          {additionalLinks.map((link, index) => (
                            <div
                              key={index}
                              className="flex w-full items-center relative"
                            >
                              {getIconForUrl(link)}
                              <Input
                                type="text"
                                name={`additionalLinks[${index}]`}
                                placeholder={`Link ${index + 1}`}
                                value={link}
                                onChange={(event) =>
                                  handleAdditionalLinkChange(event, index)
                                }
                                className="ml-2 w-full"
                              />
                              <Button
                                variant={"destructive"}
                                className="w-6 absolute right-3 z- h-6 p-2 rounded-full"
                                type="button"
                                onClick={() => removeAdditionalLink(index)}
                              >
                                <Minus className="w-10 h-10" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex flex-col space-y-4">
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
                        <Button className="w-full" type="submit">
                          Save
                        </Button>
                      </div>
                    </div> */}
                    <div className="gap-10">
                      <Button disabled className="select-none mt-4 mb-8 w-full">
                        {"Default (Selected)"}
                      </Button>
                      <Button variant={"vicecity"} className="w-full mb-8">
                        {"Vice City (Coming soon)"}
                      </Button>
                      <Button variant={"coastal"} className="w-full mb-8">
                        {"Coastal (Coming soon)"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="flex min-h-[100dvh] md:fixed md:w-1/2 right-0 justify-center items-center">
                {profiles
                  .filter((profile) => profile.userOwner === userID)
                  .slice(0, 1)
                  .map((profile) => (
                    <div className="w-80 border-4 border-[#1e1e1e] rounded-2xl">
                      <AspectRatio
                        className="flex justify-center items-center"
                        ratio={9 / 16}
                      >
                        <div key={profile._id}>
                          <div className="flex flex-col justify-center items-center">
                            <Avatar className="w-40 h-40">
                              <AvatarImage
                                src={profile.imageUrl}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {profile.username}
                              </AvatarFallback>
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
                                  <div className="flex flex-wrap justify-center">
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
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  ))}
              </div>
              <div>
                <div className="md:w-1 md:mt-20 rounded-t-full md:h-1/2 md:mr-2 bg-gradient-to-t from-[#8ebec0] via-[#f8914c] to-background" />
                <div className="md:w-1 rounded-b-full md:h-1/3 md:mr-2 bg-gradient-to-b from-[#8ebec0] to-background" />
              </div>
            </div>
            <div className="md:flex hidden">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
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
