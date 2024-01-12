"use client";
import Navbar from "@/components/Admin/Navbar";
import ProfilesGrid from "@/components/Faces/ProfilesGrid";
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
