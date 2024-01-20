import React from "react";
import { motion, useInView } from "framer-motion";

const Create = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto flex flex-col lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pl-8 lg:mr-32 flex items-center">
            <div className="lg:max-w-lg">
              <motion.div
                initial="hidden"
                ref={ref}
                animate={isInView ? "show" : "hidden"}
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.h1
                  className="text-4xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Create a cool Profile in minutes{" "}
                </motion.h1>
                {/* Create a cool Profile in minutes{" "} */}
                <motion.p
                  className="mt-6 text-lg leading-8 text-primary/50"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Connect your Instagram, Twitter, Linkedin, GitHub, Spotify,
                  website, podcast, and more.
                </motion.p>
                {/* <p className="mt-6 text-lg leading-8 text-primary/50">
                  Connect your Instagram, Twitter, Linkedin, GitHub, Spotify,
                  website, podcast, and more.
                </p> */}
              </motion.div>
            </div>
          </div>
          <img
            src="/home/add.png"
            alt="Product screenshot"
            className="w-[57rem]"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
