export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestionExam {
  id: string;
  title: string;
  description?: string;
}

export interface IQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
  exam: IQuestionExam | null;
}

export type ExamQuestionsPayload = {
  questions: IQuestion[];
};

export interface IQuestionAnswerPayload {
  text: string;
  isCorrect: boolean;
}

export interface ICreateQuestionPayload {
  text: string;
  answers: IQuestionAnswerPayload[];
}

export interface ICreateQuestionWithExamPayload extends ICreateQuestionPayload {
  examId: string;
}

export type IUpdateQuestionPayload = Partial<ICreateQuestionPayload>;

export interface IBulkQuestionsPayload {
  questions: ICreateQuestionPayload[];
}
