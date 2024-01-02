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

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profiles");
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
      await axios.post("http://localhost:3001/profiles", profile);
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

  return (
    <div>
      <div className="flex flex-col w-full min-h-screen justify-center items-center">
        <Carousel setApi={setApi} className="w-full sm:max-w-md max-w-[18rem]">
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
                  <span className="text-4xl font-semibold">Instruction 1</span>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex h-[30rem] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">Instruction 2</span>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex h-[30rem] items-center justify-center p-6">
                  {existingProfile ? (
                    redirect()
                  ) : (
                    <form onSubmit={onSubmit} className="w-96">
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            onChange={handleChange}
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Bio</Label>
                          <Textarea
                            name="bio"
                            id="bio"
                            onChange={handleChange}
                            placeholder="Some cool bio"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Image URL</Label>
                          <Input
                            name="imageUrl"
                            id="imageUrl"
                            onChange={handleChange}
                            placeholder="Your cool face"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Links</Label>
                          <div className="flex items-center">
                            <div className="">
                              {profile.links.map((link, index) => (
                                <div className="relative mr-3">
                                  <Input
                                    key={index}
                                    type="text"
                                    name="links"
                                    placeholder={`Link ${index + 1}`}
                                    value={link}
                                    onChange={(event) =>
                                      handleLinkChange(event, index)
                                    }
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
                              className="w-8 h-8 p-2 rounded-full"
                              type="button"
                              onClick={addLink}
                            >
                              <Plus className="w-10 h-10" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Button>Submit</Button>
                        </div>
                      </div>
                    </form>
                  )}
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
    </div>
  );
};

export default Edit;

// "use client";

// export default function CarouselDApiDemo() {

//   return (

//   );
// }
