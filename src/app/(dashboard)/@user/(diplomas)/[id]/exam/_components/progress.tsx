"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizProgress({
  title,
  currentQuestion,
  totalQuestions,
}: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full space-y-2 ">
      {/* Top Row */}
      <div className="flex items-center justify-between text-sm">
        <h2 className="font-medium ">{title}</h2>
        <span className="text-gray-500">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
}