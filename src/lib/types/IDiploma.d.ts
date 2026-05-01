export interface IDiploma {
  id: string; 
  title: string;
  description: string;
  image: string; 
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDiplomasResponse {
  status: boolean;
  code: number;
  payload: {
    data: IDiploma[];
  };
}

