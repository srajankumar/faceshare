const Share = () => {
  return (
    <div className="overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto flex flex-col-reverse lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <img
            src="/home/qr.png"
            alt="Product screenshot"
            className="xl:px-40 lg:px-[25%] px-20 w-[57rem]"
            width={500}
            height={500}
          />
          <div className="lg:pl-8 lg:mr-32 flex items-center lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl select-none sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#8ebec0] to-[#f8914c] text-transparent bg-clip-text">
                Share it with your friends
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary/50">
                Effortlessly share your personalized online hub with friends
                through a QR code, simplifying connectivity and ensuring
                seamless access to all your important links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
