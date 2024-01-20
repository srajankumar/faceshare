import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Cards = () => {
  return (
    <div className="flex flex-col mb-10 md:mb-10 w-full justify-center items-center px-8">
      <motion.div
        className="rounded-md"
        initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
        animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
        transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="max-w-7xl mb-20">
              <img src="/home/add.png" alt="" />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <p className="max-w-2xl md:pt-10 leading-[2.5rem] text-2xl sm:text-3xl text-center">
        Your all-in-one solution to showcase all your important links in one
        place.
      </p>
    </div>
  );
};

export default Cards;
