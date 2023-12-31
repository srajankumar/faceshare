import Link from "next/link";
const Hero = () => {
  return (
    <main className="hero flex px-8 justify-center items-center h-screen">
      <div className="mx-auto max-w-2xl">
        {/* <div className="mb-10 flex justify-center">
        <div className="relative rounded-full px-5 py-1 bg-foreground/10 text-sm leading-6 text-primary ring-1 ring-border">
          {"View public profiles ->"}
        </div>
      </div> */}
        <div className="text-center">
          <h1 className="text-4xl sm:leading-[4.5rem] sm:text-6xl font-semibold">
            The Open Source Linktree Substitute
          </h1>
          <p className="md:mt-6 mt-4 md:text-lg text-sm md:leading-8 leading-6 text-primary/50">
            Build your awesome profile and easily share it with your connections
            for free! Create a standout online presence that reflects your
            uniqueness.
          </p>
          <div className="md:mt-10 md:text-base text-sm mt-5 flex items-center justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-[#8ebec0] to-[#f8914c] px-5 py-2.5 font-bold shadow-sm text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {"Get Started ->"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
