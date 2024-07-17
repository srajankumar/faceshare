import Link from "next/link";

const Footer = () => {
  return (
    <nav className="w-full z-40 backdrop-blur-md flex items-center py-5 pb-10 px-8">
      <div className="flex lg:container sm:flex-row flex-col items-center w-full justify-center">
        <div className="flex items-center space-x-3">
          <p className="text-sm text-primary/50">
            <span className="select-none">
              © {new Date().getFullYear()} - Face Share by
            </span>
            <Link
              href="https://srajan.vercel.app"
              target="_blank"
              className="underline ml-1 underline-offset-4 hover:text-primary"
            >
              Srajan Kumar
            </Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
