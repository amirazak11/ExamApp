export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string | null;
  duration: number;
  diplomaId: string;
  createdAt: string;
  updatedAt: string;
  questionsCount: number;
}
