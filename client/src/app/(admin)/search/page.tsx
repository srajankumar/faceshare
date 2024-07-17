"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Admin/Navbar";
import ProfilesGrid from "@/components/Search/ProfilesGrid";

const All = () => {
  return (
    <div>
      <Navbar />
      <ProfilesGrid selectedProfileId={null} />
      {/* <Footer /> */}
    </div>
  );
};

export default All;
