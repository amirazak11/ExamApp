import { ChevronDown } from "lucide-react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface ScrollCardProps {
  children: React.ReactNode;
  dataLength: number;
  fetchData: () => void;
  hasMore: boolean;
  scrollableTarget?: string;
}

export function ScrollCard({
  children,
  dataLength,
  fetchData,
  hasMore,
  scrollableTarget,
}: ScrollCardProps) {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={fetchData}
      hasMore={hasMore}
      scrollableTarget={scrollableTarget}
      loader={
        <div className="mt-8 flex flex-col items-center py-2 text-center text-gray-600">
          <p className="GeistMono">Scroll to view more</p>
          <ChevronDown />
        </div>
      }
      endMessage={
        <div className="mt-8 flex flex-col items-center py-2 text-center text-gray-600">
         <p className="GeistMono">End of list</p>
        </div>
      }
    >
      {children}
    </InfiniteScroll>
  );
}