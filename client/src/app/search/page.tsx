"use client";
import Navbar from "@/components/Home/Navbar";
import ProfilesGrid from "@/components/Search/ProfilesGrid";

const All = () => {
  return (
    <div>
      <Navbar />
      <ProfilesGrid selectedProfileId={null} />
    </div>
  );
};

export default All;
