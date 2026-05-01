export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: IExamDiploma;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IExamDiploma {
  id: string;
  title: string;
}

export interface IDiplomasResponse {
  status: boolean;
  code: number;
  payload: {
    data: IExam[];
  };
}

