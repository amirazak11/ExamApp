"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IQuestion } from "@/features/questions/types/questions";
import useQuestions from "@/features/questions/hooks/use-questions";
import {
  ISubmitExamBody,
  ISubmitExamPayload,
  SelectedAnswer,
} from "@/features/questions/types/submissions";
import RegisterButton from "@/app/(auth)/_components/login-button";
import ExamResult from "./submission";

type ExamFormProps = {
  data: IQuestion[];
  examId: string;
  startedAt: string;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
};

export default function ExamForm({
  data,
  examId,
  startedAt,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: ExamFormProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [examResult, setExamResult] = useState<ISubmitExamPayload | null>(null);

  const { sendAnswer, isPending } = useQuestions();

  const currentQuestion = data[currentQuestionIndex];

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === data.length - 1;

  const selectedAnswer =
    selectedAnswers.find((item) => item.questionId === currentQuestion?.id)
      ?.answerId ?? "";

  const isCurrentQuestionAnswered = Boolean(selectedAnswer);
  const isAllAnswered = selectedAnswers.length === data.length;
  function handleNext() {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }

  function handleSelectAnswer(questionId: string, answerId: string) {
    setSelectedAnswers((prev) => {
      const isAnsweredBefore = prev.some(
        (item) => item.questionId === questionId
      );

      if (isAnsweredBefore) {
        return prev.map((item) =>
          item.questionId === questionId
            ? { questionId, answerId }
            : item
        );
      }

      return [...prev, { questionId, answerId }];
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body: ISubmitExamBody = {
      examId,
      answers: selectedAnswers,
      startedAt,
    };

    sendAnswer(body, {
      onSuccess: (response) => {
        setExamResult(response.payload);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  if (examResult) {
    return <ExamResult result={examResult} />;
  }

  if (!currentQuestion) return null;

  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="pb-4 text-2xl font-semibold text-blue-600">
          {currentQuestion.text}
        </h3>

        <RadioGroup
          name={currentQuestion.id}
          value={selectedAnswer}
          onValueChange={(answerId) =>
            handleSelectAnswer(currentQuestion.id, answerId)
          }
        >
          {currentQuestion.answers.map((answer) => (
            <FieldLabel
              key={answer.id}
              htmlFor={answer.id}
              className="rounded-none border-none bg-gray-50 hover:bg-gray-100"
            >
              <Field orientation="horizontal">
                <RadioGroupItem
                  className="size-4 border-gray-400 checked:border-blue-600"
                  value={answer.id}
                  id={answer.id}
                />

                <FieldContent>
                  <FieldTitle>{answer.text}</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <RegisterButton
          variant="previous"
          onClick={handlePrevious}
          disabled={isFirstQuestion || isPending}
        />

        {!isLastQuestion ? (
          <RegisterButton
            variant="next"
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered || isPending}
          />
        ) : (
          <RegisterButton
            variant="submit"
            isPending={isPending}
            disabled={!isAllAnswered || isPending}
          />
        )}
      </div>
    </form>
  );
}