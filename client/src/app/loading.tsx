import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
      <div className="max-w-xl flex flex-col justify-center items-center">
        <Skeleton className="w-40 mb-6 h-40 rounded-full" />
        <Skeleton className="w-80 mb-3 h-5 rounded-xl" />
        <div className="flex w-full justify-end items-center max-w-md">
          <div className="w-40 rounded-full h-1 mr-2 bg-gradient-to-r from-background via-[#8ebec0] to-[#f8914c]" />
          <div className="text-xl">loading</div>
        </div>
      </div>
    </div>
  );
};

export default loading;
