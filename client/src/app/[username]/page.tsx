"use client";

import { useEffect, useState } from "react";

export default function Username({ params }: { params: { username: string } }) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${params.username}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
      }
    };

    fetchUserData();
  }, [params.username]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Username: {userData.login}</h1>
          <p>Name: {userData.name}</p>
          <p>Followers: {userData.followers}</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
