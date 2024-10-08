"use client";
import Hero from "@/components/Main/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Main/Navbar";
import Cards from "@/components/Main/Cards";
import Create from "@/components/Main/Create";
import Share from "@/components/Main/Share";
import Find from "@/components/Main/Find";

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <Hero />
      <Cards />
      <Create />
      <Share />
      <Find />
      <Footer />
    </div>
  );
}
