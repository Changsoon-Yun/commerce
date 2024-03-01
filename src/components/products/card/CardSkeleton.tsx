import { Skeleton } from '@/components/ui/skeleton.tsx';

export default function CardSkeleton() {
  return (
    <>
      <div className={'flex flex-col gap-4 p-2'} data-testid={'skeleton-card'}>
        <Skeleton className="w-full h-0 pb-[100%] rounded-lg" />
        <Skeleton className="w-full h-[28px]" />
        <Skeleton className="w-full h-[20px]" />
        <div className={'flex justify-between gap-4'}>
          <Skeleton className="flex-1 h-[18px]" />
        </div>
      </div>
    </>
  );
}
