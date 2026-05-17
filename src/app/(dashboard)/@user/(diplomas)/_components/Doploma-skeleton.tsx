'use client';

import { Suspense, useMemo } from "react";
import { ScrollCard } from "./scroll";
import DiplomasList from "./Doploma-list";
import { IDiploma } from "@/lib/types/IDiploma";
import useDiplomaList from "@/features/doplomas/_hooks/use-diplomas-list";

export default function DiplomasSkeleton() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useDiplomaList();

const diplomas: IDiploma[] = useMemo(() => {
  return (data?.pages ?? []).flatMap((page) => page?.data ?? []);
}, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div id="diplomas-scroll" className="overflow-auto h-[calc(100vh-180px)] ">
    <ScrollCard
      dataLength={diplomas.length}
      fetchData={() => fetchNextPage()}
      hasMore={hasNextPage ?? false}
      scrollableTarget="diplomas-scroll"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">

        <DiplomasList data={diplomas} />
      </div>
    </ScrollCard>
    </div>
  );
}