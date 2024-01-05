"use client";

import * as React from "react";
import axios from "axios";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useGetUsername } from "@/hooks/useGetUsername";
import { useState, useEffect, ChangeEvent } from "react";

import { Plus, Minus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Profile {
  name: string;
  bio: string;
  imageUrl: string;
  links: string[];
  userOwner: string | null;
  username: string | null;
}

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

  const { toast } = useToast();

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

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLinkChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const urlRegex = /^[^ "]*\.*$/;

    const links = profile.links;
    links[index] = value;
    const areAllLinksValid = links.every((link) => urlRegex.test(link));

    setProfile({ ...profile, links });
    setIsValidLinks(areAllLinksValid);

    if (!areAllLinksValid) {
      toast({
        title: "Not a valid link",
        description: "Please enter a valid link.",
        variant: "destructive",
      });
    }
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
    try {
      await axios.post(`${serverUrl}/profiles`, profile);
      toast({
        title: "Profile Added!",
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
    } finally {
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
      event.preventDefault(); // Prevent default behavior (e.g., form submission)
      const form = event.currentTarget.form;
      const index = Array.from(form!.elements).indexOf(event.currentTarget);

      // Move to the next input field or submit if it's the last one
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

  return (
    <div>
      <div className="flex flex-col w-full min-h-screen py-40 items-center">
        {existingProfile ? (
          redirect()
        ) : (
          <form onSubmit={onSubmit}>
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
                <Label htmlFor="name">Image URL</Label>
                <Input
                  name="imageUrl"
                  id="imageUrl"
                  onChange={handleChange}
                  placeholder="Your cool face"
                  disabled={isLoading}
                  onKeyPress={handleKeyPress}
                />
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
        )}
      </div>
    </div>
  );
};

export default Edit;
