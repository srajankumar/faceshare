"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/`);
        if (response.ok && isMounted) {
          setLoading(false);
          toast({
            title: "Server connected!",
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

    return () => {
      isMounted = false;
    };
  }, [toast]);

  return (
    <>
      {loading && (
        <div className="fixed flex justify-center items-center bg-secondary px-3 py-2 rounded-md m-5 bottom-0 z-50 right-0 ">
          Connecting to server
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
            className="h-5 w-5 ml-2 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}
    </>
  );
}
