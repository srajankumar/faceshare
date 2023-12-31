"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { BatteryCharging, Wifi } from "lucide-react";

interface FloatingPhoneProps {}

const FloatingPhone: React.FC<FloatingPhoneProps> = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-gradient-to-tr from-background via-[#8ebec0] to-[#f8914c]"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

interface HeaderBarProps {}

const HeaderBar: React.FC<HeaderBarProps> = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900"></div>
    </>
  );
};

interface ScreenProps {}

const Screen: React.FC<ScreenProps> = () => {
  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-background">
      <img src="/test.jpg" alt=""></img>
    </div>
  );
};

interface ThreeDProps {}

const ThreeD: React.FC<ThreeDProps> = () => {
  return (
    <section className="grid place-content-center ">
      <FloatingPhone />
    </section>
  );
};

export default ThreeD;
