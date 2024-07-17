"use client";

import * as React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useRouter } from "next/navigation";
import { useGetUsername } from "@/hooks/useGetUsername";
import { useState, useEffect, ChangeEvent } from "react";

import { Plus, Minus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import Footer from "@/components/Footer";

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
  } else if (url.includes("leetcode")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        className="hover:scale-110 transition-all duration-300 m-3"
      >
        <path
          fill="currentColor"
          d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104a5.35 5.35 0 0 0-.125.513a5.527 5.527 0 0 0 .062 2.362a5.83 5.83 0 0 0 .349 1.017a5.938 5.938 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523a2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"
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
  const [cookies] = useCookies(["access_token"]);
  const router = useRouter();

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  function convertToBase64(e: any) {
    const reader = new FileReader();
    const image = new Image();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        image.src = event.target.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 500; // set your desired maximum width
          const maxHeight = 500; // set your desired maximum height
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

  useEffect(() => {
    if (userID == null) {
      router.push("/");
    }

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

    const links = profile.links.map((link, i) =>
      i === index ? value.trim().toLowerCase() : link
    );

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
      toast.error("Invalid links.");

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
      await axios.post(`${serverUrl}/profiles`, updatedProfile, {
        headers: { authorization: cookies.access_token },
      });
      toast.success("Profile successfully added.");
      setTimeout(() => {
        setExistingProfile(profile);
      }, 1000);
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        toast.error("Authorization error.");
      } else {
        toast.error("Failed to add profile details. Please try again.");
      }
      setIsLoading(false);
      console.error(err);
    }
  };

  const redirect = () => {
    window.location.href = "/admin";
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
      {existingProfile ? (
        redirect()
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="w-full xl:mx-20">
            <div className="grid md:grid-cols-2">
              <Drawer>
                <DrawerTrigger className="lg:hidden z-50 fixed bottom-10 flex w-full justify-center">
                  <Button
                    className="rounded-full px-10 backdrop-blur-sm"
                    variant={"secondary"}
                  >
                    Preview
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="flex px-5 my-20 flex-col justify-center xl:pr-40 lg:pr-20 items-center w-full">
                    <Avatar className="w-40 h-40">
                      <AvatarImage
                        className="object-cover"
                        src={image || undefined}
                      />
                      <AvatarFallback>{previewProfile.username}</AvatarFallback>
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
                          <div className="flex flex-wrap justify-center">
                            {previewProfile.links.map(
                              (
                                link: string,
                                index: React.Key | null | undefined
                              ) => (
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
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
              <form onSubmit={onSubmit}>
                <div className="flex lg:mx-20 mx-8 py-32 flex-col items-center min-h-[100dvh]">
                  <div className="max-w-xl w-full flex flex-col mx-8 my-3">
                    <div className="text-2xl mb-5 font-semibold">
                      <p>Add your profile</p>
                      <div className="w-full mt-2 rounded-full h-1 mr-2 bg-gradient-to-r from-[#8ebec0] via-[#f8914c] to-background" />
                    </div>
                    <div className="flex w-full flex-col my-2 pb-2">
                      <Label className="mb-2">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full"
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <Label className="pb-2">Bio</Label>
                      <Textarea
                        name="bio"
                        id="bio"
                        onChange={handleChange}
                        placeholder="Some cool bio"
                        className="w-full"
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <div className="flex w-full flex-col my-2">
                      <Label className="mb-2">Image</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="mt-2 w-full flex flex-wrap items-center">
                      <div className="flex flex-wrap w-full flex-col">
                        <div className="flex justify-center items-center flex-col mb-2">
                          {profile.links.map((link, index) => (
                            <div
                              key={index}
                              className="flex w-full relative items-center"
                            >
                              {getIconForUrl(link)}
                              <Input
                                key={index}
                                type="text"
                                name="links"
                                placeholder={`Link ${index + 1}`}
                                value={link}
                                disabled={isLoading}
                                onChange={(event) =>
                                  handleLinkChange(event, index)
                                }
                                className={`ml-2 w-full ${
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
                                className="w-6 absolute right-3 z- h-6 p-2 rounded-full"
                                type="button"
                                onClick={() => removeLink(index)}
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
                                onClick={addLink}
                                disabled={isLoading}
                              >
                                <Plus className="w-10 h-10" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Button
                          disabled={isLoading || !isValidLinks}
                          className="w-full"
                        >
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
                  </div>
                </div>
              </form>
              <div className="md:flex fixed w-1/2 hidden right-0 justify-center items-center">
                <div className="flex justify-center items-center min-h-[100dvh]">
                  <div className="flex flex-col justify-center items-center">
                    <Avatar className="w-40 h-40">
                      <AvatarImage
                        src={image || undefined}
                        className="object-cover"
                      />
                      <AvatarFallback>{previewProfile.username}</AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                      <p className="sm:max-w-md my-3 text-center">
                        {previewProfile.bio}
                      </p>
                      <div className="flex w-full justify-end items-center max-w-md">
                        <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
                        <div className="text-xl">{previewProfile.name}</div>
                      </div>
                      <div className="mt-2 sm:max-w-md flex flex-wrap items-center space-x-10">
                        <div className="flex flex-col">
                          <div className="flex flex-wrap justify-center">
                            {previewProfile.links.map((link, index) => (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
