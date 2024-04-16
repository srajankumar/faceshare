"use client";
import Navbar from "@/components/Main/Navbar";
import ProfilesGrid from "@/components/Main/ProfilesGrid";
import Footer from "@/components/Footer";

const All = () => {
  return (
    <div>
      <Navbar />
      <ProfilesGrid selectedProfileId={null} />
      <Footer />
    </div>
  );
};

export default All;
