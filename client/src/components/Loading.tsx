"use client";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed flex justify-center select-none items-center bg-background border border-border text-sm text-white px-5 py-3 rounded-md m-5 bottom-0 z-50 right-0">
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
      {error && (
        <div className="fixed flex justify-center select-none items-center bg-red-950 border border-red-900 text-sm text-white px-5 py-3 rounded-md m-5 bottom-0 z-50 right-0">
          Server connection failed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-5 w-5 ml-2"
          >
            <path
              fill="currentColor"
              d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8"
            />
          </svg>
        </div>
      )}
    </>
  );
}
