"use client";
import Hero from "@/components/Home/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <>
      <Loading />
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
