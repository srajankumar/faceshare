"use client";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Input } from "@/components/ui/input";
const Edit = () => {
  const userID = useGetUserID();

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    imageUrl: "",
    links: [],
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLinkChange = (event, index) => {
    const { value } = event.target;
    const links = profile.links;
    links[index] = value;
    setProfile({ ...profile, links });
  };

  const addLink = () => {
    setProfile({ ...profile, links: [...profile.links, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/profiles", profile);
      alert("Profile added");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col w-96 space-y-4">
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="bio">Bio</label>
        <Input type="text" name="bio" id="bio" onChange={handleChange} />
        <label htmlFor="imageUrl">Image URL</label>
        <Input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="links">Links</label>
        <button type="button" onClick={addLink}>
          Add links
        </button>
        {profile.links.map((link, index) => (
          <Input
            key={index}
            type="text"
            name="links"
            value={link}
            onChange={(event) => handleLinkChange(event, index)}
          ></Input>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
