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