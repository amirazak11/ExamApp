export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string | null;
  duration: number;
  diplomaId: string;
  diploma?: { id: string; title: string } | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  questionsCount: number;
}
