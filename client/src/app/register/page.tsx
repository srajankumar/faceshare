"use client";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/components/Register/user-auth-form";

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

export default function Login() {
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

  const redirect = () => {
    window.location.href = "/admin";
    return null;
  };

  if (existingProfile) {
    redirect();
  }

  return (
    <>
      <div className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
          <Image
            quality={100}
            priority
            src="/register.jpg"
            className="relative bg-black object-cover w-full h-full z-20"
            layout="fill"
            alt=""
          ></Image>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
