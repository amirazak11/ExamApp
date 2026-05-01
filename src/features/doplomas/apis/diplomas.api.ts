import { IApiResponse } from "@/lib/types/api";
import { IDiploma } from "@/lib/types/IDiploma";
 
export async function getExam(id: string) {
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/diplomas/${id}`);

  const data: IApiResponse<IDiploma> = await response.json();


  if (data.status === true) {
    return data.payload
  }

  return data
}

