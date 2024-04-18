// import Link from "next/link";
// import { Heart } from "lucide-react";

// const Footer = () => {
//   return (
//     <nav className="w-full z-40 backdrop-blur-md flex items-center py-5 pb-10 px-8">
//       <div className="flex lg:container sm:flex-row flex-col items-center w-full justify-center">
//         <div className="flex items-center space-x-3">
//           <p className="text-sm text-primary/50">
//             <span className="select-none">
//               © {new Date().getFullYear()} Face Share -
//             </span>
//             <Link
//               href="https://srajan.vercel.app/"
//               target="_blank"
//               className="underline ml-1 underline-offset-4 hover:text-primary"
//             >
//               srajan
//             </Link>
//           </p>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Footer;

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <div className="px-5">
        <div className="">
          <footer className="bg-black lg:container">
            <div className="mx-auto w-full py-6 lg:py-8">
              <div className="md:flex md:justify-between py-5">
                <div className="mb-6 md:mb-0">
                  <div className="pb-5">
                    <Link className="flex py-2 items-center gap-1" href="/">
                      <Image
                        src="/globe.png"
                        alt="icon"
                        width={500}
                        height={500}
                        className="w-7 h-7"
                      ></Image>
                      <p className="font-semibold text-lg pl-1">Face Share</p>{" "}
                    </Link>
                    <p className="text-primary/50">
                      A Link in Bio. But Rich and Beautiful.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6">
                  <div>
                    <h2 className="mb-6 tracking-wider text-sm font-semibold uppercase text-white">
                      Links
                    </h2>
                    <ul className="flex flex-col gap-4 text-primary/50 font-medium">
                      <li>
                        <Link
                          href="https://srajan.vercel.app/"
                          target="_blank"
                          className="underlined_link hover:text-white transition-colors duration-200"
                        >
                          Srajan Kumar
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/srajankumar/faceshare"
                          target="_blank"
                          className="underlined_link hover:text-white transition-colors duration-200"
                        >
                          Source Code
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          href="/"
                          className="underlined_link hover:text-white transition-colors duration-200"
                        >
                          Donate us
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-input sm:mx-auto lg:my-8" />
              <div className="sm:flex text-sm sm:items-center sm:justify-between">
                <span className="sm:text-center text-primary/50">
                  Face Share © {new Date().getFullYear()} All Rights Reserved.
                </span>
                <div className="flex mt-4 items-center gap-2 sm:justify-center sm:mt-0 text-primary/50">
                  Made on earth with <Heart className="w-4 h-4" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
