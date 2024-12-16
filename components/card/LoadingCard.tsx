import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div>
      <SkeletonCardHero />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-8 mt-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className="h-[300px] rounded-md mb-2" />
      <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/2 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/4 rounded-md" />
    </div>
  );
};

export const SkeletonCardHero = () => {
  return (
    <div>
      <Skeleton className=" w-full h-[600px] rounded-md mb-2" />
      <Skeleton className="w-2/5 h-12 rounded-md mb-2 mx-auto" />
    </div>
  );
};

export default LoadingCard;
