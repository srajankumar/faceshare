import ThreeD from "@/components/Home/ThreeD";

const Mockup = () => {
  return (
    <div className="w-full my-40 pb-20 justify-center flex items-center">
      <div className="w-[60rem] justify-center flex items-center relative">
        <div className="border-[2px] mb-20 border-white rounded-xl w-[50rem]">
          <img src="/test.png" className="w-full rounded-xl" alt="" />
        </div>

        <div className="absolute bottom-0 right-0 z-10">
          <ThreeD />
        </div>
      </div>
    </div>
  );
};

export default Mockup;
