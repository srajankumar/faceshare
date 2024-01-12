const Find = () => {
  return (
    <div className="overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto flex flex-col lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pl-8 lg:mr-32 flex items-center">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
                Explore and connect with ease
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary/50">
                Search and connect with like-minded individuals, building your
                online presence within a network of shared interests and
                passions.
              </p>
            </div>
          </div>
          <img
            src="/home/find.png"
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

export default Find;
