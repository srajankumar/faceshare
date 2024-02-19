import React from "react";
import { motion, useInView } from "framer-motion";

const Share = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto flex flex-col-reverse lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <img
            src="/home/qr.png"
            alt="Product screenshot"
            className="xl:px-40 px-[25%] w-[57rem]"
            width={500}
            height={500}
          />
          <div className="lg:pl-8 lg:mr-32 flex items-center lg:pt-4">
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
                  className="md:text-4xl text-3xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  One tap share.
                </motion.h1>
                <motion.h1
                  className="mt-6 md:text-lg leading-8 text-primary/50"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Effortlessly share your personalized online hub with friends
                  through a QR code.
                </motion.h1>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
