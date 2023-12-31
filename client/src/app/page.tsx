import Hero from "@/components/Home/Hero";
import Image from "next/image";
import Link from "next/link";
import Mockup from "@/components/Home/Mockup";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Mockup /> */}
      <Footer />
    </div>
  );
}
