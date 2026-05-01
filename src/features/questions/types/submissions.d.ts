export interface ISubmitAnswer {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamBody {
  examId: string;
  answers: ISubmitAnswer[];
  startedAt: string;
}
type SelectedAnswer = {
  questionId: string;
  answerId: string;
};

export interface ISubmitExamBody {
  examId: string;
  answers: SelectedAnswer[];
  startedAt: string;
}

export interface SelectedAnswer {
  questionId: string;
  answerId: string;
}
export interface ISubmitExamResponse {
  status: boolean;
  code: number;
  payload: ISubmitExamPayload;
}

export interface ISubmitExamPayload {
  submission: ISubmission;
  analytics: IQuestionAnalytics[];
}

export interface ISubmission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  submittedAt: string;
}

export interface IQuestionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: IAnswer;
  isCorrect: boolean;
  correctAnswer: IAnswer;
}

export interface IAnswer {
  id: string;
  text: string;
}