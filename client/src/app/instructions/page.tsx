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
import Link from "next/link";

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
    const links = profile.links;
    links[index] = value;
    setProfile({ ...profile, links });
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
    }
  };

  const redirect = () => {
    window.location.href = "/home";
    return null;
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
      {existingProfile ? (
        redirect()
      ) : (
        <div className="flex flex-col w-full min-h-screen justify-center items-center">
          <Carousel
            setApi={setApi}
            className="w-full sm:max-w-md max-w-[19rem]"
          >
            <CarouselContent>
              <CarouselItem>
                <Card>
                  <CardContent className="flex h-[30rem] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Get Started!</span>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex h-[30rem] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      Instruction 1
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex h-[30rem] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      Instruction 2
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex flex-col h-[30rem] items-center justify-center p-6">
                    <Link href="/add-profile">
                      <Button disabled={isLoading}>
                        {" "}
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
                        )}{" "}
                        Get Started!
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
