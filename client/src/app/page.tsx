"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/profiles`);
        if (response.ok) {
          setLoading(false);
          toast({
            title: "Connected!",
            description: "The app is now successfully connected to the server.",
          });
        } else {
          console.error("Failed to fetch data from the server");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Oops! Something went wrong.",
          description:
            "We encountered an issue while fetching data. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
