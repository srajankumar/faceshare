const Find = () => {
  return (
    <div className="overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl md:px-20 px-8">
        <div className="mx-auto flex flex-col lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* <div className="lg:pr-8 lg:ml-32 flex items-center lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
                Find your cult online
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary/50">
                Search and connect with like-minded individuals, building your
                online presence within a network of shared interests and
                passions.
              </p>
            </div>
          </div> */}

          <div className="lg:pr-8 flex items-center lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
                Find your cult online
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary/50">
                Search and connect with like-minded individuals, building your
                online presence within a network of shared interests and
                passions.
              </p>
            </div>
          </div>
          {/* <img
            src="/testt.png"
            alt="Product screenshot"
            className="xl:px-40 lg:px-[25%] px-20 w-[57rem]"
            width={500}
            height={500}
          /> */}
          <img
            src="/home/find.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};

export default Find;
