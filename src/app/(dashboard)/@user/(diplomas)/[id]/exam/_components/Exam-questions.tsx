"use client";

import * as React from "react";

import CircularTimer from "./timer";
import QuizProgress from "./progress";
import { IQuestion } from "@/features/questions/types/questions";
import ExamForm from "./Exam-form";

type QuestionsProps = {
  data: IQuestion[];
  examId: string;
};

export default function Questions({ data, examId }: QuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const [startedAt] = React.useState(() => new Date().toISOString());

  const totalQuestions = data?.length ?? 0;

  return (
    <div className="grow overflow-auto bg-white p-4 h-[calc(100vh-180px)]">
      <div className="mb-4 flex items-center gap-6">
        <QuizProgress
          title="Frontend Development - CSS Quiz"
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        <span className="h-14 border-r-2 border-gray-200"></span>

        <CircularTimer minutes={5} />
      </div>

      <ExamForm
        data={data || []}
        examId={examId}
        startedAt={startedAt}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}