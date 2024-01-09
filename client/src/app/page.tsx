"use client";
import Hero from "@/components/Home/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import Loading from "@/components/Loading";
import Cards from "@/components/Home/Cards";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Loading />
      <Navbar />
      <Hero />
      <Cards />
    </div>
  );
}
