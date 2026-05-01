import { useMutation } from "@tanstack/react-query";
import { sendAnswer } from "../apis/submission.api";
import {
  ISubmitExamBody,
  ISubmitExamResponse,
} from "../types/submissions";

export default function useQuestions() {
  const { mutate, isPending, error, data } = useMutation<
    ISubmitExamResponse,
    Error,
    ISubmitExamBody
  >({
    mutationFn: sendAnswer,
  });

  return {
    sendAnswer: mutate,
    isPending,
    error,
    data,
  };
}