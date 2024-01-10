"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Logout from "../Logout";
import { Star, StarIcon } from "lucide-react";

interface GitHubStarButtonProps {
  owner: string;
  repo: string;
}

const GitHubStarButton: React.FC<GitHubStarButtonProps> = ({ owner, repo }) => {
  const [starCount, setStarCount] = useState(null);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        setStarCount(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub star count:", error);
      }
    };

    fetchStarCount();
  }, [owner, repo]);

  return (
    <Button variant={"outline"} className="flex gap-2">
      <Star className="w-5 h-5 text-primary/50" />
      <p>Star on GitHub</p>
      {starCount !== null ? `${starCount}` : ""}
    </Button>
  );
};

function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md flex items-center py-4 px-8">
      <div className="flex lg:container items-center w-full justify-between">
        <div className="flex items-center gap-x-3">
          <Link className="flex mr-3 items-center space-x-1" href="/home">
            <Image
              src="/globe.png"
              alt="icon"
              width={500}
              height={500}
              className="w-10 h-10"
            ></Image>
            <p className="font-semibold">Face Share</p>{" "}
          </Link>
          <Link
            href="/search"
            className="hover:text-blue-300 transition-all duration-200 text-sm"
          >
            Search
          </Link>
        </div>
        <div className="flex gap-x-3">
          <Link
            href="https://github.com/srajankumar/faceshare/stargazers"
            target="_blank"
          >
            <GitHubStarButton owner="srajankumar" repo="faceshare" />
          </Link>
          <Logout />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
