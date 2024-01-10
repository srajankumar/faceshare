"use client";

import * as React from "react";
import axios from "axios";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useGetUsername } from "@/hooks/useGetUsername";
import { useState, useEffect, ChangeEvent } from "react";

import { Plus, Minus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

interface Profile {
  name: string;
  bio: string;
  imageUrl: string;
  links: string[];
  userOwner: string | null;
  username: string | null;
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

const Edit = () => {
  const userID = useGetUserID();
  const username = useGetUsername();
  const [profiles, setProfiles] = useState([]);
  const [existingProfile, setExistingProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidLinks, setIsValidLinks] = useState(true);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [image, setImage] = React.useState<string | null>(null);
  const { toast } = useToast();

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  function convertToBase64(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string" || result === null) {
        setImage(result);
      } else {
        console.error("Unsupported FileReader result type:", typeof result);
      }
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

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
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfiles();
  }, [userID]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [profile, setProfile] = useState<Profile>({
    name: "",
    bio: "",
    imageUrl: "",
    links: [],
    userOwner: userID,
    username: username,
  });

  const [previewProfile, setPreviewProfile] = useState<Profile>({
    name: "",
    bio: "",
    imageUrl: "",
    links: [],
    userOwner: userID,
    username: username,
  });

  useEffect(() => {
    setPreviewProfile(profile);
  }, [profile]);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLinkChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/;

    const links = profile.links;
    links[index] = value.trim();
    const areAllLinksValid = links.every((link) => urlRegex.test(link));

    setProfile({ ...profile, links });
    setIsValidLinks(areAllLinksValid);
  };

  const addLink = () => {
    setProfile({ ...profile, links: [...profile.links, ""] });
  };

  const removeLink = (indexToRemove: number) => {
    const updatedLinks = profile.links.filter(
      (_, index) => index !== indexToRemove
    );
    setProfile({ ...profile, links: updatedLinks });
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    setIsLoading(true);
    event.preventDefault();

    const areAllLinksValid = profile.links.every((link) =>
      /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/.test(link.trim())
    );

    if (!areAllLinksValid) {
      toast({
        title: "Invalid links",
        description: "Please make sure all links are valid.",
        variant: "destructive",
      });

      // Find the first invalid link and set focus
      const firstInvalidIndex = profile.links.findIndex(
        (link) =>
          !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/.test(link.trim())
      );

      if (firstInvalidIndex !== -1) {
        const invalidInput = document.querySelector(
          `#link${firstInvalidIndex}`
        );
        if (invalidInput instanceof HTMLInputElement) {
          invalidInput.focus();
        }
      }

      setIsLoading(false);
      return;
    }

    try {
      const updatedProfile = { ...profile, imageUrl: image };
      await axios.post(`${serverUrl}/profiles`, updatedProfile);
      toast({
        title: "Profile Added!",
        variant: "success",
      });

      setTimeout(() => {
        setExistingProfile(profile);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Oops! Failed to add profile details",
        description: "Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const redirect = () => {
    window.location.href = "/home";
    return null;
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const form = event.currentTarget.form;
      const index = Array.from(form!.elements).indexOf(event.currentTarget);

      const nextElement = form!.elements[index + 1];
      if (nextElement) {
        (nextElement as HTMLElement).focus();
      } else {
        form!.submit();
      }
    }
  };

  if (loading) {
    return (
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
    );
  }

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
      <div className="flex flex-col w-full items-center">
        {existingProfile ? (
          redirect()
        ) : (
          <div className="container relative min-h-screen items-center justify-center flex flex-col lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <form
              onSubmit={onSubmit}
              className="xl:px-40 lg:px-20 lg:py-36 pt-36 pb-20"
            >
              <div>
                <h1 className="text-2xl font-bold">Add your profile</h1>
                <div className="sm:w-96 w-60 rounded-full h-1 mt-3 mb-10 bg-gradient-to-r to-background from-[#8ebec0] mr-20 via-[#f8914c]" />
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Full Name"
                    disabled={isLoading}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Bio</Label>
                  <Textarea
                    name="bio"
                    id="bio"
                    onChange={handleChange}
                    placeholder="Some cool bio"
                    disabled={isLoading}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Image</Label>
                  <div className="flex pt-2 space-x-10 justify-center items-center">
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={convertToBase64}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Links</Label>
                  <div className="flex flex-col space-y-4">
                    <div className="space-y-3">
                      {profile.links.map((link, index) => (
                        <div key={index} className="relative">
                          <Input
                            key={index}
                            type="text"
                            name="links"
                            placeholder={`Link ${index + 1}`}
                            value={link}
                            disabled={isLoading}
                            onChange={(event) => handleLinkChange(event, index)}
                            className={`${
                              !isValidLinks &&
                              !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/.test(
                                link.trim()
                              )
                                ? "border-destructive"
                                : ""
                            }`}
                          ></Input>
                          <Button
                            variant={"destructive"}
                            className="w-6 h-6 p-2 absolute top-2 right-2 rounded-full"
                            type="button"
                            onClick={() => removeLink(index)}
                          >
                            <Minus className="w-10 h-10" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-8 h-8 p-2 mr-4 rounded-full"
                      type="button"
                      onClick={addLink}
                      disabled={isLoading}
                    >
                      <Plus className="w-10 h-10" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button disabled={isLoading || !isValidLinks}>
                    {isLoading && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 animate-spin"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    )}
                    Submit
                  </Button>
                </div>
              </div>
            </form>
            <div className="flex flex-col justify-center px-2 xl:pr-40 lg:pr-20 items-center w-full lg:pb-0 pb-10">
              <div className="lg:hidden">
                <h1 className="text-2xl font-bold">Preview</h1>
                <div className="sm:w-96 w-60 rounded-full h-1 mt-3 mb-10 bg-gradient-to-r to-background from-[#8ebec0] mr-20 via-[#f8914c]" />
              </div>
              <Avatar className="w-40 h-40">
                <AvatarImage
                  className="object-cover"
                  src={image || undefined}
                />
                <AvatarFallback> {previewProfile.username}</AvatarFallback>
              </Avatar>
              <div className="max-w-xl flex flex-col justify-center items-center lg:mx-8 mt-3">
                <p className="sm:max-w-md my-3 text-center">
                  {previewProfile.bio}
                </p>
                <div className="flex w-full justify-end items-center max-w-md">
                  <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                  <div className="md:text-xl text-lg">
                    {previewProfile.name}
                  </div>
                </div>
                <div className="mt-2 sm:max-w-md flex flex-wrap items-center space-x-10">
                  <div className="flex flex-col">
                    <div className="flex flex-wrap">
                      {previewProfile.links.map(
                        (link: string, index: React.Key | null | undefined) => (
                          <div key={index}>
                            <Link
                              href={addHttpPrefix(link)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getIconForUrl(link)}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="flex mt-4 space-x-4 w-full">
                <AlertDialog>
                  <AlertDialogTrigger className="w-full">
                    <Button className="w-full rounded-full">
                      <QrCode />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <Qr id={previewProfile.username} />
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogContent>
                </AlertDialog>
              </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
