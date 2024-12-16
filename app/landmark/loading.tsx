import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div className="flex justify-between rounded-md mt-4 mb-2 h-10">
        <Skeleton className="w-1/4" />
        <Skeleton className="w-1/6" />
      </div>
      <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md mt-2" />
      <Skeleton className="h-4 w-3/4 rounded-md mt-2" />
      <Skeleton className="h-4 w-2/4 rounded-md mt-2" />
    </>
  );
};
export default loading;
