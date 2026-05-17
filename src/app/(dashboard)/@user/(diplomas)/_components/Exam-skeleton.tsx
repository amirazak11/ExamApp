'use client';

import { useMemo } from "react";
import useExamList from "@/features/questions/hooks/use-exams-list";
import { IExam } from "@/lib/types/comment";
import { ExamCard } from "../_components/exam-card";
import { ScrollCard } from "../_components/scroll";

type ExamsClientProps = {
  diplomaId: string;
};

export default function ExamsSkeleton({ diplomaId }: ExamsClientProps) {  
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useExamList(diplomaId);
  const exams: IExam[] = useMemo(() => {
    return (data?.pages ?? []).flatMap((page) => page?.data ?? []);
  }, [data]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
        <div id="exams-scroll" className="overflow-auto grow bg-white p-4 h-[calc(100vh-180px)] ">
        <ScrollCard
          dataLength={exams.length}
          fetchData={() => fetchNextPage()}
          hasMore={hasNextPage ?? false}
          scrollableTarget="exams-scroll"
        >
      <div id="exams-scroll" className=" flex flex-col gap-4 ">
        {exams.map((exam: IExam) => (
        <ExamCard
          key={exam.id}
          id={exam.id}
          icon={exam.image}
          title={exam.title}
          description={exam.description}
          questions={exam.questionsCount}
          duration={exam.duration}
        />
      ))}
      </div>
        </ScrollCard>
        </div>

  );
}