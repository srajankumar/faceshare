import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);

    // setTimeout(() => {
    //   window.location.href = "/login";
    // }, 3000);
  };

  return (
    <main className="hero flex px-8 justify-center items-center h-screen">
      <div className="mx-auto max-w-2xl">
        {/* <div className="mb-10 flex justify-center">
        <div className="relative rounded-full px-5 py-1 bg-foreground/10 text-sm leading-6 text-primary ring-1 ring-border">
          {"View public profiles ->"}
        </div>
      </div> */}
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="text-center">
          <h1 className="text-4xl sm:leading-[3.5rem] sm:text-5xl font-semibold">
            An Open Source Linktree Substitute
          </h1>
          <p className="mt-3 md:text-lg md:leading-8 leading-6 text-primary/50">
            Build your awesome profile and easily share it with your connections
            for free! Create a standout online presence that reflects your
            uniqueness.
          </p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <Button onClick={handleClick}>{"Get Started ->"}</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <Cookie className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="flex justify-center items-center">
                <div className="h-16 mb-2 mr-5 rounded-full text-3xl text-[#f8914c] grid place-items-center">
                  <Image
                    src="/cookie.png"
                    alt="cookie"
                    width={500}
                    height={500}
                    className="w-10 h-10"
                  ></Image>
                </div>
                <h3 className="text-3xl font-bold text-center mb-2">
                  Cookie Notice
                </h3>
              </div>
              <p className="text-center mb-6">
                This app uses cookies to enhance your experience and provide
                personalized content. By continuing to use the app, you consent
                to the use of cookies.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity font-semibold w-full py-2 rounded"
                >
                  <Link href="/login" className="w-full">
                    Got it!
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hero;
