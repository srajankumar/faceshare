"use client";
// ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profiles");
        setProfiles(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfiles();
  }, []);

  const handleEditClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/profiles/${selectedProfile._id}`,
        selectedProfile
      );
      alert("Profile updated");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div className="flex">
        <div>
          <h2>All Profiles</h2>
          <ul>
            {profiles.map((profile) => (
              <li key={profile._id}>
                {profile.name} - {profile.bio}
                <button onClick={() => handleEditClick(profile)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedProfile && (
            <div>
              <h2>Edit Profile</h2>
              <form
                onSubmit={handleSave}
                className="flex flex-col w-96 space-y-4"
              >
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedProfile.name}
                  onChange={handleChange}
                />
                <label htmlFor="bio">Bio</label>
                <Input
                  type="text"
                  name="bio"
                  id="bio"
                  value={selectedProfile.bio}
                  onChange={handleChange}
                />
                {/* Add other profile fields here */}
                <button type="submit">Save</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
