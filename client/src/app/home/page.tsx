"use client";

import Edit from "@/components/Home/Edit";
import Navbar from "@/components/Home/Navbar";
import ProfilesGrid from "@/components/Search/ProfilesGrid";
import Logout from "@/components/Logout";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid md:grid-cols-2">
        <div>
          <Edit />
        </div>
      </div>
    </div>
  );
};

export default Home;
